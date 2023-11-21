import os
import time
import dotenv
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from ...lib.drivers.web import (
    DINE_RES_HEADER_NAV,
    DINE_RES_URL,
    HOST_RES_HEADER_NAV,
    LOGIN_FRAME,
    PROCESSING_REQUEST_FRAME,
    WAIT_TIMEOUT,
    Driver,
)

dotenv.load_dotenv()


class TestDriver:
    def test_dispatch(self):
        """It should test dispatching a request."""
        driver = Driver.test_client()

        kwargs = {
            "is_adult": True,
        }

        res, status_code = driver.dispatch("get_resort_tickets", **kwargs)

        assert status_code == 200, f"Failed to get {res}."
        assert res is not None

        res, status_code = driver.dispatch("get_hotels")

        assert status_code == 501

        res, status_code = driver.dispatch("get_profile")

        assert status_code == 401

        res, status_code = driver.dispatch("get_unknown")

        assert status_code == 404

        kwargs = {
            "partySize": 2,
        }

        res, status_code = driver.dispatch("get_dining_availability", **kwargs)

        assert status_code == 400

    def test__handle_pw_form(self):
        """It should test handling the password form."""
        pass

    def test__handle_change_pw_form(self):
        """It should test handling the change password form."""
        pass

    def test__get_visible_element(self):
        """
        It should get the visible element.
        - If there are multiple elements, it should return the last element.
        """
        driver = Driver.test_client()

        # time.sleep(1)

        is_visible = driver._get_visible_element(xpath=PROCESSING_REQUEST_FRAME)

        assert is_visible is None

        is_visible = driver._get_visible_element(xpath=HOST_RES_HEADER_NAV)

        assert is_visible is not None

        driver.quit()

    def test__is_displayed(self):
        """It should check if an element is displayed.
        - The element might be available in the dom but not visible.
        """
        driver = Driver.test_client()

        elem = driver._get_visible_element(xpath=LOGIN_FRAME)

        assert elem is not None, "Failed to get element."

        is_displayed = driver._is_displayed(elem)

        assert is_displayed is False

        driver.get("https://disneyworld.disney.go.com/login/")

        elem = driver._get_visible_element(xpath=LOGIN_FRAME)

        assert elem is not None, "Failed to get element."

        driver.quit()

    def test__is_visible(self):
        """It should check if an element is visible.
        - The element should not only be available in the DOM but also displayed.
        """
        driver = Driver.test_client()

        is_visible = driver._is_visible(xpath=LOGIN_FRAME)

        assert is_visible is False

        driver.get("https://disneyworld.disney.go.com/login/")
        time.sleep(1)

        is_visible = driver._is_visible(xpath=LOGIN_FRAME)

        assert is_visible is True

        driver.quit()

    def test__get_element(self):
        """
        It should get an element.
        - There is no guarentee the element is or is not visible, but will be present in the DOM.
        """
        driver = Driver.test_client()

        elem = driver._get_element(xpath=LOGIN_FRAME)

        assert elem is not None

        driver.quit()

    def test__wait_for_element(self):
        """It should wait for an element to be present and visible in the DOM."""
        driver = Driver.test_client()

        elem = driver._wait_for_element(xpath=HOST_RES_HEADER_NAV)

        assert elem is not None

        driver.quit()

    def test__reload(self):
        """It should test reloading the page."""
        driver = Driver.test_client()

        driver._reload()

        assert driver._wait_for_element(xpath=HOST_RES_HEADER_NAV) is not None

        driver.quit()

    def test__current_header_xpath(self):
        """It should get the current header xpath."""
        driver = Driver.test_client()

        assert driver._current_header_xpath() == HOST_RES_HEADER_NAV

        driver.get("https://disneyworld.disney.go.com/dine-res/availability")

        driver._wait_for_element(xpath=DINE_RES_HEADER_NAV)

        assert driver._current_header_xpath() == DINE_RES_HEADER_NAV

        driver.quit()

    def test__login(self):
        """It should test logging in."""
        driver = Driver.test_client()

        driver._login()

        driver._wait_for_element(xpath=HOST_RES_HEADER_NAV)

        auth_status = driver.auth_manager.refresh()

        assert auth_status.isLoggedIn is True
        assert auth_status.isSecure is True

        driver.quit()

    def test__handle_login_form(self):
        """It should test handling the login form."""
        driver = Driver.test_client()

        driver.get("https://disneyworld.disney.go.com/login/")

        WebDriverWait(driver, WAIT_TIMEOUT).until(
            EC.frame_to_be_available_and_switch_to_it((By.XPATH, LOGIN_FRAME))
        )

        driver._handle_login_form()

        elem = driver._wait_for_element(By.XPATH, '//*[@id="InputRedeemOTP"]')

        if driver.current_url != "https://disneyworld.disney.go.com/login":
            assert elem is None

        assert elem is not None

        driver.quit()

    def test__handle_otp_form(self):
        """It should test handling the OTP form."""

        driver = Driver.test_client()

        driver.get("https://disneyworld.disney.go.com/login/")

        WebDriverWait(driver, WAIT_TIMEOUT).until(
            EC.frame_to_be_available_and_switch_to_it((By.XPATH, LOGIN_FRAME))
        )

        driver._handle_login_form()

        elem = driver._wait_for_element(By.XPATH, '//*[@id="InputRedeemOTP"]')

        if driver.current_url != "https://disneyworld.disney.go.com":
            assert elem is not None
            driver._handle_otp_form()
        else:  # login was successful with no OTP
            assert False is True, "Login was successful with no OTP."

        driver.switch_to.default_content()

        elem = driver._wait_for_element(By.XPATH, HOST_RES_HEADER_NAV, timeout=10)

        assert elem is not None

        driver.quit()

    def test_submit(self):
        """It should test submitting a form."""

        driver = Driver.test_client()

        driver.get("https://disneyworld.disney.go.com/login/")

        WebDriverWait(driver, WAIT_TIMEOUT).until(
            EC.frame_to_be_available_and_switch_to_it((By.XPATH, LOGIN_FRAME))
        )

        elem = driver._get_element(
            By.XPATH,
            '//*[@id="InputIdentityFlowValue"]',
        )

        assert elem is not None

        elem.send_keys(os.getenv("DISNEY_USERNAME"))

        driver._submit()  # submit the username

        assert (
            driver._wait_for_element(
                By.XPATH,
                '//*[@id="InputPassword"]',
            )
            is not None
        )

        driver.quit()

    def test__wait_for_element_invisible(self):
        """It should wait for an element to disappear."""
        driver = Driver.test_client()

        driver.get("https://disneyworld.disney.go.com/login/")

        WebDriverWait(driver, WAIT_TIMEOUT).until(
            EC.frame_to_be_available_and_switch_to_it((By.XPATH, LOGIN_FRAME))
        )

        elem = driver._get_element(
            By.XPATH,
            '//*[@id="InputIdentityFlowValue"]',
        )

        assert elem is not None

        elem.send_keys(os.getenv("DISNEY_USERNAME"))

        driver._submit()  # submit the username

        assert (
            driver._wait_for_element_invisible(
                xpath='//*[@id="InputIdentityFlowValue"]',
            )
            is True
        )

        driver.quit()

    def test__handle_popup(self):
        """It should test handling the popup."""

        driver = Driver.test_client(login=True, fast=True)

        # force the popup // delete cookies (_abck, bm_sz, sec_cpt, _fbp)
        for key in ["_abck", "bm_sz", "sec_cpt", "_fbp"]:
            driver.delete_cookie(key)

        driver.get(DINE_RES_URL)

        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, PROCESSING_REQUEST_FRAME))
        )

        driver._handle_popup()

        assert driver._is_visible(xpath=DINE_RES_HEADER_NAV) is True
        assert driver._is_visible(xpath=PROCESSING_REQUEST_FRAME) is False

        driver.quit()

    def test__load_preconditions(self):
        """It should test loading the preconditions."""

        driver = Driver.test_client(login=True, fast=True, reload=True)

        driver._load_preconditions()

        assert driver._is_visible(xpath=DINE_RES_HEADER_NAV) is True
        assert driver._is_visible(xpath=PROCESSING_REQUEST_FRAME) is False

        driver.quit()
