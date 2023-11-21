import logging
import os
import time

import dotenv
from fake_useragent import UserAgent
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from seleniumrequests import Firefox

from .. import abc
from ..errors import ActionLookupError
from ..utils import create_password
from .api import API
from .auth import AuthManager
from .cookies import CookieStore
from .otp import EmailDriver

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[logging.FileHandler("./logs/web.log"), logging.StreamHandler()],
    )

dotenv.load_dotenv()

WAIT_TIMEOUT = 4  # seconds
PAGE_LOAD_TIMEOUT = 8  # seconds
DINE_RES_URL = "https://disneyworld.disney.go.com/dine-res/availability"
BASE_HEADER_NAV = "/div/div[1]/div/div[1]/div[2]/div[1]/a"
DINE_RES_HEADER_NAV = '//*[@id="headerWrapper"]' + BASE_HEADER_NAV
HOST_RES_HEADER_NAV = '//*[@id="navigationHeader"]' + BASE_HEADER_NAV
PROCESSING_REQUEST_FRAME = '//*[@id="sec-cpt-if"]'
LOGIN_FRAME = '//*[@id="oneid-iframe"]'


class Driver(Firefox):
    def __init__(self, _login: bool = True, _fast: bool = False, _reload=True):
        self.initialized = False
        st = time.time()
        logging.log(logging.INFO, "Starting...")

        self.user_agent = UserAgent().firefox
        profile = FirefoxProfile()
        profile.set_preference("general.useragent.override", self.user_agent)

        options = Options()
        options.binary_location = "/usr/bin/firefox"
        options.set_preference(
            "browser.startup.homepage", "https://www.disneyworld.disney.go.com/"
        )
        options.set_preference("browser.startup.page", 1)
        options.profile = profile
        service = Service(
            executable_path="/usr/bin/geckodriver",
        )

        super().__init__(
            options=options,
            service=service,
        )

        self.implicitly_wait(2)  # seconds
        self.session = self.requests_session

        self.session.cert = (
            os.getenv("DISNEY_CERT_PATH"),
            os.getenv("DISNEY_KEY_PATH"),
        )

        self.implicitly_wait(1)  # seconds

        self.cookie_store = CookieStore(self)

        if _reload:
            self.cookie_store.load()

        self.auth_manager = AuthManager(self)
        self.api = API(self)

        self.auth_status = abc.Auth()
        if _login:
            self.auth_status = self.auth_manager.refresh()

            logging.info(f"{'Logged in':<12}: {self.auth_status.isLoggedIn}")
            logging.info(f"{'Secure':<12}: {self.auth_status.isSecure}")

        if _fast is False:
            self._load_preconditions()

        if self.auth_manager.is_secure():
            self.initialized = True

        logging.info(
            f"{'Initialized' if self.initialized else 'Partially initialized'} in {time.time() - st} seconds."
        )

    def dispatch(self, action: str, **kwargs) -> tuple[dict[str,], int]:
        data = None
        try:
            res = None
            match action:
                case "get_parks":
                    res = self.api.get_parks()  # {ids:..., parks:...}
                case "get_passes":
                    res = self.api.get_passes()  # {ids:..., passes:...}
                case "get_tickets":
                    res = self.api.get_tickets(**kwargs)  # {tickets: ...}
                case "get_hotels":
                    # res = self.api.get_hotels()  # {hotels: ...}
                    data = abc.HTTPResponse(
                        status_code=abc.STATUS_NOT_IMPLEMENTED,
                        message="Not Implemented",
                    )
                case "get_profile":
                    # res = self._get_profile()  # {profile: ...}
                    data = abc.HTTPResponse(
                        status_code=abc.STATUS_UNAUTHORIZED,
                        message="Unauthorized",
                    )
                case "get_calendar":
                    res = self.api.get_calendar()  # {calendar: ...}
                case "get_resort_tickets":
                    res = self.api.get_resort_tickets(**kwargs)  # {tickets: ...}
                case "get_blockout_dates":
                    res = self.api.get_blockout_dates(**kwargs)  # {blockoutDates: ...}
                case "get_auth_status":
                    res = self.auth_manager.refresh()  # {auth_status: ...}
                case "get_status":
                    res = self.api.status()  # {status: ...}
                case "get_dining_availability":
                    self.auth_manager.refresh()
                    res = self.api.get_dining_availability(
                        **kwargs
                    )  # {availabilities: ...}
                case _:
                    raise ActionLookupError(action)  # raise an error

            if res:
                data = abc.HTTPResponse(status_code=abc.STATUS_OK, data=res._asdict())
            elif not data:
                data = abc.HTTPResponse(
                    status_code=abc.STATUS_BAD_REQUEST, message="Bad Request."
                )

        except ActionLookupError:
            logging.warning(f"Unknown action. {action}")
            data = abc.HTTPResponse(
                status_code=abc.STATUS_NOT_FOUND, message="Not Found."
            )

        except Exception as e:
            logging.error(e)
            data = abc.HTTPResponse(
                status_code=abc.STATUS_INTERNAL_SERVER_ERROR,
                message="Internal Server Error.",
            )

        return data._asdict(), data.status_code

    def _get_visible_element(
        self, by: str = By.XPATH, xpath: str = None
    ) -> WebElement | None:
        elems = self.find_elements(by, xpath)
        return elems.pop() if len(elems) > 0 else None

    def _is_displayed(self, elem: WebElement | None) -> bool:
        return elem.is_displayed() if elem is not None else False

    def _is_visible(self, by: str = By.XPATH, xpath: str = None) -> bool:
        elem = self._get_element(by, xpath)
        return self._is_displayed(elem)

    def _get_element(self, by: str = By.XPATH, xpath: str = None) -> WebElement | None:
        return self._get_visible_element(by, xpath)

    def _wait_for_element_invisible(
        self,
        by: str = By.XPATH,
        xpath: str = PROCESSING_REQUEST_FRAME,
        timeout: int = WAIT_TIMEOUT,
        supress: bool = False,
    ) -> bool:
        try:
            WebDriverWait(self, timeout=timeout, poll_frequency=0.1).until(
                EC.invisibility_of_element_located((by, xpath))
            )
        except TimeoutException:
            if not supress:
                logging.warning("Timed out waiting for element to disappear.")
            return False
        return True

    def _wait_for_element(
        self,
        by: str = By.XPATH,
        xpath: str = HOST_RES_HEADER_NAV,
        timeout: int = WAIT_TIMEOUT,
        supress: bool = False,
    ) -> WebElement | None:
        try:
            return WebDriverWait(self, timeout, poll_frequency=0.1).until(
                EC.visibility_of_element_located((by, xpath))
            )
        except TimeoutException:
            if not supress:
                logging.warning(f"Timed out waiting for element to load: ({xpath})")
            pass

    def _submit(self):
        btn = self._get_element(By.XPATH, '//*[@id="BtnSubmit"]')
        return None if btn is None else btn.click()

    def _handle_login_form(self):
        elem = self._get_element(
            By.XPATH,
            '//*[@id="InputIdentityFlowValue"]',
        )

        if elem is None:
            return

        elem.send_keys(os.getenv("DISNEY_USERNAME"))

        self._submit()  # submit the username

        self._wait_for_element(
            By.XPATH,
            '//*[@id="InputPassword"]',
        ).send_keys(os.getenv("DISNEY_PASSWORD"))

        self._submit()  # submit the password

    def _handle_pw_form(self):
        elem = self._get_element(
            By.XPATH,
            '//*[@id="InputPassword"]',
        )
        if elem is None:
            return

        elem.send_keys(os.getenv("DISNEY_PASSWORD"))

        self._submit()  # submit the form

    def _handle_change_pw_form(self):
        elem = self._get_element(By.XPATH, '//*[@id="password-new"]')
        if elem is None:
            return

        create_password()

        elem.send_keys(os.getenv("DISNEY_PASSWORD"))

        self._submit()  # submit the form

    def _handle_otp_form(self):
        elem = self._wait_for_element(By.XPATH, '//*[@id="InputRedeemOTP"]')

        if not self._is_displayed(elem):
            return

        email_driver = EmailDriver()

        otp = email_driver.get_otp()

        logging.info(f"Acquired OTP: {otp}")

        for i, value in enumerate(otp):
            self.find_element(
                By.XPATH,
                f'//*[@id="otp-code-input-{i}"]',
            ).send_keys(value)

        if self._is_visible(By.XPATH, '//*[@id="InputRedeemOTP-error"]'):
            raise Exception("Invalid OTP code.")

        self._submit()  # submit the form

    def _login(self):
        self.get("https://disneyworld.disney.go.com/login/")

        WebDriverWait(self, WAIT_TIMEOUT).until(
            EC.frame_to_be_available_and_switch_to_it((By.XPATH, LOGIN_FRAME))
        )

        self._handle_login_form()

        self._handle_otp_form()

        self._handle_change_pw_form()

        self.switch_to.default_content()

        self._wait_for_element(timeout=10)

    def _current_header_xpath(self) -> str:
        """Returns the XPATH of the current header displayed."""
        return (
            DINE_RES_HEADER_NAV
            if self.current_url == DINE_RES_URL
            else HOST_RES_HEADER_NAV
        )

    def _handle_popup(self):
        if self._is_visible(xpath=PROCESSING_REQUEST_FRAME):
            if self._wait_for_element_invisible(timeout=15, supress=True) is False:
                self._reload()
                return self._handle_popup()

    def _load_preconditions(self):
        self.get(DINE_RES_URL)

        self._wait_for_element(xpath=DINE_RES_HEADER_NAV)
        self._handle_popup()

        if self._is_visible(xpath=LOGIN_FRAME):
            self._login()

    def _reload(self):
        self.refresh()
        self._wait_for_element(xpath=self._current_header_xpath())
        self._handle_pw_form()

    def test_client(login: bool = False, fast: bool = True, reload=False):
        return Driver(login, fast, reload)
