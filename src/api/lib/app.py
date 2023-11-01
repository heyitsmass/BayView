import json
import logging
import os
import random
import string
import sys
import time
from datetime import datetime, timedelta
from typing import Literal

import dotenv
from fake_useragent import UserAgent
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from seleniumrequests import Firefox

from . import abc
from .loop import Heartbeat
from .otp import EmailDriver

dotenv.load_dotenv()

logging.log(logging.INFO, "Starting...")


BINARY_PATH = (
    "/usr/local/bin/firefox" if sys.platform == "darwin" else "/usr/bin/firefox"
)

EXEC_PATH = (
    "./bin/geckodriver_macos_aarch"
    if sys.platform == "darwin"
    else "./bin/geckodriver_linux"
)


def options_builder(
    user_agent: str,
    binary_location: str = BINARY_PATH,
    headless: bool = False,
    homepage: str = "https://www.disneyworld.disney.go.com/",
    executable_path: str = EXEC_PATH,
) -> tuple[Options, Service,]:
    options = Options()

    options.binary_location = binary_location
    logging.log(logging.INFO, f"Set binary location to {binary_location}")

    if headless:
        options.add_argument("-headless")
        logging.log(logging.INFO, "Headless mode enabled.")

    if homepage:
        options.set_preference("browser.startup.homepage", homepage)
        options.set_preference("browser.startup.page", 1)
        logging.log(logging.INFO, f"Set homepage to {homepage}")

    options.profile = FirefoxProfile()

    options.profile.set_preference("general.useragent.override", user_agent)
    logging.log(logging.INFO, f"Set user agent to {user_agent}")

    service = Service(executable_path=executable_path)

    logging.log(logging.INFO, f"Set executable path to {executable_path}")
    return (
        options,
        service,
    )


PASSWORD_LENGTH = 12  # length of the password

# this seems redundant but allows for easy modification of the time limits
# e.g. 1:2s or 1.2:2s
ONE_SECOND = 1
ONE_MINUTE = ONE_SECOND * 60  # 1 minute in seconds
FIVE_MINUTES = 5 * ONE_MINUTE  # 5 minutes in seconds
FIFTEEN_MINUTES = 15 * ONE_MINUTE  # 15 minutes in seconds
ONE_HOUR = 60 * ONE_MINUTE  # 1 hour in seconds
ONE_DAY = ONE_HOUR * 24  # 1 day in seconds

WAIT_TIMEOUT = ONE_SECOND * 3
LOAD_TIMEOUT = ONE_SECOND * 40
REQUEST_TIMEOUT = ONE_SECOND * 10


class ActionLookupError(Exception):
    def __init__(self, name: str):
        self.args = {f"Unknown action. {name}"}


class Driver(Firefox):
    def __init__(self):
        options = Options()  # create an options instance

        self.user_agent = UserAgent().firefox  # get a random user agent

        options, service = options_builder(
            self.user_agent
        )  # build the options and service

        self.last_auth = 0  # last time the auth was reloaded
        self.hb = None
        self.auth_status = {
            "isLoggedIn": False,
            "isSecure": False,
        }

        super().__init__(service=service, options=options)  # initialize the driver

    def init(self, hb: bool = True, auth: bool = True):
        st = time.time()
        self.reload_cookies("./data/cookies.json")  # reload the cookies
        self.reload()  # reload the page

        self.init_session()  # initialize the requests session

        if auth:
            self.authenticate()  # authenticate the user

        if hb:
            self.hb = Heartbeat(
                fn=self.reload_auth,
            )  # create a heartbeat instance
            self.hb.run(FIVE_MINUTES)

        logging.info(f"Initialized in {time.time() - st} seconds.")

    def authenticate(self):
        self.reload_auth(force=True)  # reload the auth status

        self.last_auth = time.time()

        logging.info(f"{'Logged in':<12}: {self.auth_status['isLoggedIn']}")
        logging.info(f"{'Secure':<12}: {self.auth_status['isSecure']}")

    """
      Executive Function
    """

    def dispatch(self, action: str, **kwargs):
        data = None
        try:
            res = None
            match (action):
                case "get_parks":
                    res = self._get_parks()  # {ids:..., parks:...}
                case "get_passes":
                    res = self._get_passes()  # {ids:..., passes:...}
                case "get_tickets":
                    res = self._get_tickets(**kwargs)  # {tickets: ...}
                case "get_hotels":
                    res = self._get_hotels()  # {hotels: ...}
                    data = abc.HTTPResponse(
                        status_code=abc.STATUS_NOT_IMPLEMENTED,
                        message="Not Implemented",
                    )
                case "get_profile":
                    data = abc.HTTPResponse(
                        status_code=abc.STATUS_UNAUTHORIZED,
                        message="Unauthorized",
                    )
                    # res = self._get_profile()  # {profile: ...}
                case "get_calendar":
                    res = self._get_calendar()  # {calendar: ...}
                case "get_resort_tickets":
                    res = self._get_resort_tickets(**kwargs)  # {tickets: ...}
                case "get_blockout_dates":
                    res = self._get_blockout_dates(**kwargs)  # {blockoutDates: ...}
                case "get_auth_status":
                    res = self.get_auth_status()  # {auth_status: ...}
                    res = abc.Auth(**res) if res else None
                case "get_status":
                    res = self.get_status()  # {status: ...}
                case "get_dining_availability":
                    res = self._get_dining_availability(
                        **kwargs
                    )  # {availabilities: ...}
                case _:
                    raise ActionLookupError(action)  # raise an error

            if res:
                data = abc.HTTPResponse(status_code=abc.STATUS_OK, data=res)
            else:
                data = abc.HTTPResponse(
                    status_code=abc.STATUS_BAD_REQUEST, message="Bad Request."
                )

        except ActionLookupError:
            logging.warn(f"Unknown action. {action}")
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

    """
      Statistical functions
    """

    def get_status(self):
        st = time.time()
        self._get_parks()
        et = time.time()

        return abc.StatusResponse(
            last_auth=datetime.fromtimestamp(self.last_auth).strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
            auth_status=self.auth_status,
            response_time=et - st,
        )

    """
      Request Functions
    """

    def _get_parks(self):
        """Gets the parks."""
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/passes/blockout-dates/api/get-parks",
        )

        if res.status_code != abc.STATUS_OK:
            return

        data = res.json()

        parks = {
            park.parkId: park._asdict()
            for park in (abc.Park(**_park) for _park in data["supported-parks"])
        }
        ids = list(parks.keys())

        return abc.ParkResponse(
            ids,
            parks,
        )

    def _get_passes(self):
        """Gets the passes."""

        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/passes/blockout-dates/api/get-passes/",
        )

        if res.status_code != abc.STATUS_OK:
            logging.info(res.status_code)
            return

        data = res.json()
        passes = {
            pass_.passId: pass_._asdict()
            for pass_ in (abc.Pass(**_pass) for _pass in data["supported-passes"])
        }
        ids = list(passes.keys())
        return abc.PassResponse(
            ids,
            passes,
        )

    def _get_tickets(
        self,
        startDate: str = datetime.now().strftime("%Y-%m-%d"),
        endDate: str | None = None,
        discountGroup: str = "std-gst",
        storeId: str = "wdw",
        numDays: int | str = 1,
        numMonths: int | str = 1,
        facility: str | None = None,
    ):
        """Gets the tickets."""
        facility = None if facility is None else facility.lower()
        numDays = int(numDays)
        if not endDate:
            endDate = (
                datetime.strptime(startDate, "%Y-%m-%d")
                + timedelta(days=numDays)
                + timedelta(days=30 * numMonths)
            ).strftime("%Y-%m-%d")

        res = self.request(
            "get",
            f"https://disneyworld.disney.go.com/api/lexicon-view-assembler-service/wdw/tickets/product-types/theme-parks/prices?discountGroup={discountGroup}&startDate={startDate}&storeId={storeId}&endDate={endDate}&numDays={numDays}&fpAvailability=false",
        )

        if res.status_code != abc.STATUS_OK:
            return

        data = res.json()

        mapped_names = {
            "mk": "Magic Kingdom",
            "ep": "Epcot",
            "ak": "Animal Kingdom",
            "hs": "Hollywood Studios",
        }

        tickets = {
            date["date"]: abc.TicketPrice(
                date=date["date"],
                validityStartDate=date["validityStartDate"],
                validityEndDate=date["validityEndDate"],
                currency=date["currency"],
                availability=date["availability"],
                lowestPricePerDay=date["lowestPricePerDay"],
                highestPricePerDay=date["highestPricePerDay"],
                lowestPrice=date["lowestPrice"],
                highestPrice=date["highestPrice"],
                prices=[
                    abc.Price(
                        name=mapped_names.get(
                            price["id"].split("_")[-1],
                            "Park Hopper Plus"
                            if "PHP" in price["id"]
                            else "Park Hopper",
                        ),
                        ageGroup=price["ageGroup"],
                        pricePerDay=price["pricePerDay"],
                        subtotal=price["subtotal"],
                        tax=price["tax"],
                        available=price["availability"],
                        validFrom=price["validityStartDate"],
                        validTo=price["validityEndDate"],
                    )
                    for price in date["pricing"]
                    if facility is None or facility in price["id"]
                ],
            )
            for point in data["pricingCalendar"]
            for date in point["dates"]
        }

        return abc.TicketsResponse(tickets)

    def _get_hotels(self):
        """Gets the hotels."""
        return

    def _get_profile(self):
        """Gets the profile."""
        return

    def _get_calendar(self):
        """Gets the calendar."""
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/dine-res/api/calendar-days",
        )

        if res.status_code != abc.STATUS_OK:
            return abc.Calendar(  # return the default
                abc.BookingDateRanges(
                    startDate=datetime.now().strftime("%Y-%m-%d"),
                    endDate=datetime.fromtimestamp(time.time() + ONE_DAY).strftime(
                        "%Y-%m-%d"
                    ),
                ),
                200,
            )

        return abc.Calendar(**res.json())

    def _get_resort_tickets(self, is_adult: bool):
        """Gets the resort tickets."""
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/api/lexicon-view-assembler-service/wdw/tickets/product-listing?storeId=wdw&affiliations=STD_GST",
        )

        if res.status_code != abc.STATUS_OK:
            return

        data = res.json()

        resorts = {}

        for group in data.get("discountGroups", []):
            for product, product_data in (
                data["discountGroups"][group].get("products", {}).items()
            ):
                product_type = abc.ProductType(**product_data.get("productKey", {}))
                is_variable_pricing = product_data.get("isVariablePricing", False)
                ticket_days = product_data.get("ticketDays", {})
                tickets = [
                    abc.Ticket(
                        **{
                            "name": ticket["names"]["standardName"]["text"],
                            "numDays": ticket["numDays"],
                            "startingFromPrice": abc.StartingPrice(
                                **ticket["startingFromPrice"]
                            ),
                            "priceDates": ticket["priceDates"],
                        }
                    )
                    for ticket in ticket_days.get("adult" if is_adult else "child", [])
                ]

                resorts[product] = abc.ResortTicket(
                    product_type, is_variable_pricing, tickets
                )

        return abc.ResortTicketsResponse(resorts)

    def _get_blockout_dates(
        self,
        facility: None | Literal["ak", "hs", "ep", "mk"],
        productTypes: list[str],
        numMonths: int | str = 1,
    ):
        """Gets the blackout dates."""
        res = self.request(
            "get",
            f"https://disneyworld.disney.go.com/passes/blockout-dates/api/get-availability/?product-types={','.join(productTypes)}&destinationId=WDW&numMonths={numMonths}",
        )

        if res.status_code != abc.STATUS_OK:
            return

        facilityMap = {"ak": "WDW_AK", "hs": "WDW_HS", "ep": "WDW_EP", "mk": "WDW_MK"}

        data = res.json()

        obj = {}

        for i, res in enumerate(data):
            dates = []
            for value in res["availabilities"]:
                if value["facilityId"] == facilityMap[facility]:
                    dates.append(
                        {
                            "date": value["date"],
                            "openTime": value.get("facilityOpeningTime", None),
                            "closeTime": value.get("facilityClosingTime", None),
                            "available": value["slots"][0]["available"],
                        }
                    )

            obj[productTypes[i]] = dates

        return abc.BlackoutDateResponse(
            facility, facilityMap[facility], productTypes, numMonths, obj
        )

    def _get_dining_availability(
        self,
        partySize: int,
        date: str | int | datetime = datetime.now().strftime("%Y-%m-%d"),
        startTime: datetime | int | str = datetime.now().strftime("%H:%M"),
        endTime: datetime
        | int
        | str = datetime.fromtimestamp(time.time() + ONE_HOUR).strftime("%H:%M"),
    ):
        """Gets the dining availability."""
        # self.load_preconditions()

        if partySize > 10:
            raise Exception("Party size cannot be greater than 10.")

        timeStart = self.fmt_date(startTime)
        timeEnd = self.fmt_date(endTime)

        if timeStart > timeEnd:
            raise Exception("Start time cannot be greater than end time.")

        date = self.fmt_date(date, "%Y-%m-%d")

        today = datetime.now().strftime("%Y-%m-%d")

        if today > date:
            raise Exception("Date cannot be in the past.")

        res = self.request(
            "get",
            f"https://disneyworld.disney.go.com/dine-res/api/availability/{partySize}/{date}/{timeStart},{timeEnd}",
        )

        if res.status_code != abc.STATUS_OK:
            return

        availability = res.json()["restaurant"]

        keys = [
            "id",
            "name",
            "description",
            "fastPassPlus",
            "mealPeriodInfo",
            "disneyOwned",
            "priceRange",
            "urlFriendlyId",
            "admissionRequired",
        ]
        availabilities = {}
        for key in availability:
            obj = {k: availability[key].get(k, "") for k in keys}
            name = obj["name"]
            obj["media"] = availability[key]["media"]["finderStandardThumb"]

            availabilities[name] = obj

            offers = availability[key]["offers"]
            availabilities[name]["offers"] = {}

            for value in offers:
                for mealPeriod in offers[value]:
                    # _type = mealPeriod["type"]
                    _type = mealPeriod["mealPeriodType"]
                    __offers = []

                    for item in mealPeriod["offersByAccessibility"]:
                        subOffers = item["offers"]
                        for subOffer in subOffers:
                            offer = abc.Offer(**subOffer)

                            __offers.append(offer)

                    availabilities[name]["offers"][_type] = __offers

        return abc.DiningAvailabilityResponse(availabilities)

    """
      Authentication Functions
    """

    def reload_auth(self, force: bool = False):
        """reloades the authentication status."""

        if force is False and time.time() - self.last_auth < FIVE_MINUTES:
            if self.auth_status["isLoggedIn"]:
                return logging.log(logging.INFO, "Auth status is still valid.")

        self.auth_status = self.get_auth_status()  # get the auth status

        if (
            self.auth_status["isLoggedIn"] is False and force is False
        ):  # check if the user is logged in
            self.login()  # log the user in

        self.last_auth = time.time()
        self.load_preconditions()  # re-load the preconditions

    def get_client_token(self):
        """Gets the client token."""
        tok = self.request(
            "get", "https://disneyworld.disney.go.com/authentication/get-client-token/"
        ).json()["access_token"]
        return f"BEARER {tok}"

    def get_auth_status(self):
        """Gets the authentication status."""
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/authentication/status/",
            timeout=REQUEST_TIMEOUT,
        )

        if res.status_code != abc.STATUS_OK:
            if res.status_code == abc.STATUS_UNAUTHORIZED:
                if os.path.isfile("./data/cookies.json"):
                    os.remove("./data/cookies.json")
                    return self.get_auth_status()
            return logging.error(f"Bad response from status endpoint. {res}")

        auth = res.json()

        if auth["isSecure"]:
            self.update_cookies()
            self.save_cookies()

        return auth

    """
        Login Functions
    """

    def _handle_login_otp(self) -> str | None:
        """Handles the login OTP prompt."""
        email_driver = EmailDriver()  # create an email driver instance

        try:
            otp = email_driver.get_otp()  # get the otp from the email
            logging.info(f"Acquired OTP: {otp}")
        except Exception as e:
            print(e)
            logging.error("Unable to acquire OTP.")
            sys.exit(0)

        for i, value in enumerate(otp):
            block = self.find_element(
                By.XPATH, f'//*[@id="otp-code-input-{i}"]'
            )  # find the otp block
            block.send_keys(value)  # type in the otp
            time.sleep(random.random())  # sleep for a random amount of time [0, 1)s

        self.find_element(By.XPATH, '//*[@id="BtnSubmit"]').click()
        logging.info("Submitted OTP.")

        try:
            WebDriverWait(self, WAIT_TIMEOUT).until(
                EC.invisibility_of_element_located(
                    (By.XPATH, '//*[@id="InputRedeemOTP-error"]')
                )
            )  # wait for the otp error to disappear

        except Exception:
            logging.error("Invalid OTP")
            sys.exit(0)

        logging.info("Logged in successfully")

    def _check_for_otp(self) -> bool:
        """Checks for the OTP prompt."""
        try:
            WebDriverWait(self, WAIT_TIMEOUT).until(
                EC.visibility_of_element_located(
                    (By.XPATH, '//*[@id="InputRedeemOTP"]')
                )
            )
        except Exception:
            return False
        return True

    def _check_for_login_form(self) -> bool:
        """Checks for the login form."""
        try:
            WebDriverWait(self, WAIT_TIMEOUT).until(
                EC.visibility_of_element_located((By.XPATH, '//*[@id="oneid-iframe"]'))
            )
        except Exception:
            return False
        return True

    def _handle_login_form(self) -> None:
        """Handles the login form."""
        WebDriverWait(self, WAIT_TIMEOUT).until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    '//*[@id="InputIdentityFlowValue"]',
                )  # wait for the username field to load
            )
        ).send_keys(
            os.getenv("DISNEY_USERNAME")
        )  # type in the username
        logging.info("Populated username field.")
        self.find_element(By.XPATH, '//*[@id="BtnSubmit"]').click()

        WebDriverWait(self, WAIT_TIMEOUT).until(
            EC.visibility_of_element_located(
                (By.XPATH, '//*[@id="InputPassword"]')
            )  # wait for the password field to load
        ).send_keys(
            os.getenv("DISNEY_PASSWORD")
        )  # type in the password
        logging.info("Populated password field.")
        self.find_element(
            By.XPATH, '//*[@id="BtnSubmit"]'
        ).click()  # click the submit button
        logging.info("Submitted form.")

    def _check_for_new_password(self):
        try:
            WebDriverWait(self, WAIT_TIMEOUT).until(
                EC.visibility_of_element_located((By.XPATH, '//*[@id="PasswordPanel"]'))
            )
        except Exception:
            return False

        return True

    def _handle_new_password(self):
        new_pw = self._create_password()  # create a new password
        self.find_element(By.XPATH, '//*[@id="password-new"]').send_keys(
            new_pw
        )  # type in the new password

        self.find_element(By.XPATH, '//*[@id="BtnSubmit"]').click()

    def _create_password(self):
        charList = (
            string.ascii_lowercase
            + string.ascii_uppercase
            + string.digits
            + string.punctuation
        )
        # create a list of character types
        password = ""

        for i in range(PASSWORD_LENGTH):
            password += random.choice(charList)  # choose a random character type

        envfile = dotenv.find_dotenv()
        dotenv.set_key(
            envfile, "DISNEY_PASSWORD", password
        )  # set the password in the .env file
        return password

    def login(self):
        """Logs into the Disney website."""
        self.clear_cookies()

        form_is_visible = self._check_for_login_form()  # check for the login form

        if not form_is_visible:
            self.get("https://disneyworld.disney.go.com/login/")  # go to the login page

        WebDriverWait(self, WAIT_TIMEOUT).until(
            EC.frame_to_be_available_and_switch_to_it(
                (By.XPATH, '//*[@id="oneid-iframe"]')
            )
        )

        self._handle_login_form()  # handle the login form

        otp = self._check_for_otp()  # check for the otp prompt

        if otp:
            self._handle_login_otp()  # handle the otp prompt

        new_password = self._check_for_new_password()

        if new_password:
            self._handle_new_password()

        self.switch_to.default_content()  # switch to the page context

        self.wait_until_page_loads()  # wait until the page loads
        self.auth_status = self.get_auth_status()  # get the auth status

    """
      Utility Functions 
    """

    def fmt_date(filepath: str, date: str | int | datetime, fmt: str = "%H:%M"):
        """
        Formats the date into the specified format. (Defaults to %H:%M)
        """
        if isinstance(date, str):
            try:
                return datetime.fromisoformat(date).strftime(fmt)
            except ValueError:
                try:
                    datetime.strptime(date, fmt)
                    return date
                except ValueError:
                    raise Exception("Unable to normalize date - Invalid format.")
        elif isinstance(date, datetime):
            return date.strftime(fmt)
        elif isinstance(date, int | float):
            return datetime.fromtimestamp(date).strftime(fmt)
        else:
            raise Exception("Unable to normalize date - Unknown type.")

    def load_preconditions(self):
        endpoint = "https://disneyworld.disney.go.com/dine-res/availability"

        self.get(endpoint) if self.current_url != endpoint else self.reload()

        self.wait_until_page_loads()

        try:
            frame = self.find_element(By.XPATH, '//*[@id="sec-cpt-if"]')

            self.switch_to.frame(frame)

            WebDriverWait(self, timeout=WAIT_TIMEOUT, poll_frequency=0.1).until(
                EC.invisibility_of_element_located(frame)
            )

            self.switch_to.default_content()
        except NoSuchElementException:
            pass
        except TimeoutException:
            return self.reload()

        if self._check_for_login_form():
            self.login()

    def wait_until_page_loads(self):
        """Waits until the navigation header fully loads."""
        try:
            WebDriverWait(self, REQUEST_TIMEOUT).until(
                EC.visibility_of_element_located(
                    (
                        By.XPATH,
                        '//*[@id="navigationHeader"]/div/div[1]/div/div[1]/div[2]/div[1]/a',
                    )
                )
            )
        except Exception:
            pass

    def reload(self):
        """reloades the page and waits for the navigation header to load"""
        self.refresh()
        self.update_cookies()
        self.wait_until_page_loads()

    def init_session(self):
        """Initializes the requests session."""
        if not self.requests_session.cert:
            self.requests_session.cert = (  # set the cert
                "./certs/client.crt",
                "./certs/keys/client.key",
            )

            logging.info("Loaded TLS certificates.")

            self.requests_session.headers.update(  # set the headers
                {
                    "User-Agent": self.user_agent,
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive",
                }
            )

            # logging.info("Set preliminary headers.")

            try:
                auth = self.get_client_token()  # get the client token
                self.requests_session.headers.update(
                    {
                        "Authorization": auth,  # set the authorization header
                    }
                )
                logging.info(f"Acquired bearer auth: {auth}")

            except Exception:
                logging.error(
                    "Unable to acquire bearer auth. - Are we connected to the internet?"
                )
                sys.exit(0)

    """
        Cookie Functions
    """

    def update_cookies(self, cookies: list[dict] | None = None):
        """Updates the cookies."""
        if cookies is None:
            cookies = self.get_cookies()  # get the cookies
        for cookie in cookies:
            self.add_cookie(cookie)  # add the cookie to the driver
            self.requests_session.cookies.set(
                cookie["name"], cookie["value"]
            )  # add the cookie to the requests session

    def save_cookies(self, loc: str = "./data/cookies.json"):
        """Saves the driver cookies to a file."""
        with open(loc, "w+", encoding="utf-8") as f:
            json.dump(
                self.get_cookies(),
                f,
                ensure_ascii=False,
                indent=4,
            )
            logging.info(f"Cookies saved to file: {loc}")

    def reload_cookies(self, loc: str = "./data/cookies.json"):
        if os.path.isfile(loc):
            with open(loc, "r", encoding="utf-8") as f:
                cookies = json.load(f)
                self.update_cookies(cookies)
                logging.info(f"Cookies reloaded from file: {loc}")

    def clear_cookies(self):
        """Clears the cookies from the driver and requests session."""
        self.delete_all_cookies()  # delete all the cookies
        self.requests_session.cookies.clear()  # clear the requests session cookies
        logging.info("Cookies cleared.")

    def stop(self):
        if self.hb and self.hb.isRunning():
            self.hb.stop()

        self.quit()


driver = Driver()

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[logging.FileHandler("debug.log"), logging.StreamHandler()],
    )
