import asyncio
import json
import os
import time
from datetime import datetime
from threading import Timer
from typing import Coroutine, Literal

from dotenv import load_dotenv
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from seleniumrequests import Firefox

from .abc import (
    AuthenticationStatus,
    AvailabilityResponse,
    Offer,
    Product,
    ProductType,
    Profile,
    StartingPrice,
    SupportedPark,
    SupportedPass,
    Ticket,
)

load_dotenv()

COOKIE_LOC = "./data/cookies.json"


class Heartbeat(Timer):
    """A class that runs a function periodically at a specified interval.

    Args:
        Timer (class): A Timer class that this class inherits from.

    Attributes:
        function (function): The function to run periodically.
        args (tuple): The positional arguments to pass to the function.
        kwargs (dict): The keyword arguments to pass to the function.
        interval (float): The interval at which to run the function.
        finished (threading.Event): An event that signals when the timer should stop.

    Methods:
        run: The method that runs the function periodically.
    """

    async def run(self):
        """
        The method that runs the function periodically.
        """
        while not self.finished.is_set():
            if isinstance(self.function, Coroutine):
                await self.function(*self.args, **self.kwargs)
            else:
                self.function(*self.args, **self.kwargs)

            await asyncio.sleep(self.interval)


class MissingEnvVariableError(Exception):
    """
    Exception raised when a required environment variable is missing.

    Attributes:
      var (str): The name of the missing environment variable.
    """

    def __init__(self, var: str):
        """
        Exception raised when a required environment variable is missing.
        """
        self.args = {f"Missing environment variable {var}"}


def check_env(value: list[str]):
    for key in value:
        if os.environ.get(key, None) is None:
            raise MissingEnvVariableError(key)


check_env(["DISNEY_USERNAME", "DISNEY_PASSWORD"])


class WebDriver(Firefox):
    """
    A class representing a firefox webdriver, includes necessary functions for logging into the `host`website
    """

    def __init__(self, host: str = "disneyworld.disney.go"):
        """
        Initializes a new instance of the WebDriver class.

        Args:
            host (str, optional): The host website to log into. Defaults to "disneyworld.disney.go".
        """
        userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0"
        options = FirefoxOptions()
        options.set_preference(
            "general.useragent.override",
            userAgent,
        )  # set the driver user agent

        # update the certs for the driver
        options.set_preference("certificate.client.ca", "./certs/client.crt")
        options.set_preference("certificate.client.key", "./certs/keys/client.key")
        options.add_argument("-headless")

        service = Service("/usr/bin/geckodriver")

        super().__init__(options=options, service=service)  # setup the driver

        self.implicitly_wait(4)  # set the implicit wait time for selenium

        self.requests_session.cert = (
            "./certs/client.crt",
            "./certs/keys/client.key",
        )  # Ensure certs are updated.
        self.requests_session.headers.update(
            {
                "User-Agent": userAgent,
            }
        )  # Forcefully set the userAgent

        self.host = host
        self.auth = AuthenticationStatus(False, False, False, None)

        self.get(f"https://{host}.com/")  # get the host (cookie averse documents.)

        try:
            self.load_cookies()
        except Exception:
            pass  # cookie averse (possibly different host)

        # assert self.auth.isLoggedIn, "Login failed."

        self.heartbeat = Heartbeat(
            10 * 60, self.reauth
        )  # refresh the auth status every 10 minutes
    def get_passes(self):
        """
        Gets the passes.
        """
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/passes/blockout-dates/api/get-passes/",
        )

        if not res.status_code == 200:
            raise Exception(f"Expected 200, got {res.status_code}")

        data = res.json()
        passIds = []
        passes = {}

        for _pass in data["supported-passes"]:
            supportedPass = SupportedPass(**_pass)
            passIds.append(supportedPass.passId)
            passes[supportedPass.passId] = supportedPass._asdict()

        return {"passIds": passIds, "passes": passes}

    def get_parks(self):
        """
        Gets the parks.
        """
        res = self.request(
            "get", f"https://{self.host}.com/passes/blockout-dates/api/get-parks"
        )

        if not res.status_code == 200:
            raise Exception(f"Expected 200, got {res.status_code}")

        data = res.json()

        parkIds = []
        parks = {}

        for _park in data["supported-parks"]:
            supportedPark = SupportedPark(**_park)
            parkIds.append(supportedPark.parkId)
            parks[supportedPark.parkId] = supportedPark._asdict()

        return {"parkIds": parkIds, "parks": parks}

    def get_blackout_dates(
        self,
        facility: None | Literal["ak", "hs", "ep", "mk"],
        productTypes: list[str],
        numMonths: int | str = 1,
    ):
        """
        Gets the blackout dates.

        Args:
            facility (None | Literal["ak", "hs", "ep", "mk"]): The facility to get the blackout dates for.
            productTypes (list[str]): The product types to get the blackout dates for.
            numMonths (int | str, optional): The number of months to get the blackout dates for. Defaults to 1.

        Returns:
            dict: A dictionary containing the facility ID, facility, product types, number of months, and data.
        """
        res = self.request(
            "get",
            f"https://{self.host}.com/passes/blockout-dates/api/get-availability/?product-types={productTypes}&destinationId=WDW&numMonths={numMonths}",
        )

        if not res.status_code == 200:
            raise Exception(f"Expected 200, got {res.status_code}")

        facilityMap = {"ak": "WDW_AK", "hs": "WDW_HS", "ep": "WDW_EP", "mk": "WDW_MK"}

        results = res.json()

        fin = {}

        for i, res in enumerate(results):
            obj = {}

            dates = []

            for key in res["availabilities"]:
                if key["facilityId"] == facilityMap[facility]:
                    obj = {
                        "date": key["date"],
                        "openTime": key.get("facilityOpeningTime", None),
                        "closeTime": key.get("facilityClosingTime", None),
                        "available": key["slots"][0]["available"],
                    }
                    dates.append(obj)

            fin[productTypes[i]] = dates

        return {
            "facilityId": facilityMap[facility],
            "facility": facility,
            "productTypes": productTypes,
            "numMonths": numMonths,
            "data": fin,
        }

    def get_resort_tickets(self, type: Literal["adult", "child"]):
        """
        Gets the resort tickets.

        Args:
            type (Literal["adult", "child"]): The type of ticket to get.

        Returns:
            dict: A dictionary containing the resorts and their associated products.
        """
        resorts = self.request(
            "get",
            f"https://{self.host}.com/api/lexicon-view-assembler-service/wdw/tickets/product-listing?storeId=wdw&affiliations=STD_GST",
        )

        if resorts.status_code != 200:
            raise Exception(f"Expected 200, got {resorts.status_code}")

        data = resorts.json()

        discountGroups = data.get("discountGroups")

        resorts = {}

        for group in discountGroups:
            products = discountGroups[group]["products"]
            for productName in products:
                productType = ProductType(**products[productName]["productKey"])
                isVariablePricing = products[productName]["isVariablePricing"]
                tickets = []

                ticketDays = products[productName]["ticketDays"]

                for ticketDay in ticketDays[type]:
                    obj = {
                        "name": ticketDay["names"]["standardName"]["text"],
                        "numDays": ticketDay["numDays"],
                        "startingFromPrice": StartingPrice(
                            **ticketDay["startingFromPrice"]
                        )._asdict(),
                        "priceDates": ticketDay["priceDates"],
                    }

                    tickets.append(Ticket(**obj)._asdict())

                resorts[productName] = Product(
                    productType._asdict(), isVariablePricing, tickets
                )._asdict()

        return resorts

    def get_profile(self):
        """
        Gets the user profile.
        """
        res = self.request(
            "get",
            "https://api.wdprapps.disney.com/pep/profile?isUser=True&brand=wdw&locale=en-us&userType=GUEST",
        )

        self.disneyProfile = Profile(**res.json())

        return self.disneyProfile._asdict()

    def get_calendar(self):
        """
        Gets the dining reservation calendar availability dates.

        Returns:
            dict: A dictionary containing the calendar availability dates.
        """

        return self.__dining_request(
            f"https://{self.host}.com/dine-res/api/calendar-days"
        ).json()

    def get_client_token(self):
        return self.request(
            "get", f"https://{self.host}.com/authentication/get-client-token/"
        ).json()["access_token"]

    def get_dining_availability(
        self,
        partySize: int,
        date: str | int | datetime = datetime.now().strftime("%Y-%m-%d"),
        startTime: datetime | int | str = datetime.now().strftime("%H:%M"),
        endTime: datetime
        | int
        | str = datetime.fromtimestamp(time.time() + (24 * 60 * 1000)).strftime(
            "%H:%M"
        ),
    ):
        """
        Gets the dining availability.
        """
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

        res = self.__dining_request(
            f"https://{self.host}.com/dine-res/api/availability/{partySize}/{date}/{timeStart},{timeEnd}"
        )

        if res.status_code != 200:
            raise Exception(f"Expected 200, got {res.status_code}")

        availability = AvailabilityResponse(**res.json()).restaurant

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

                    offers = mealPeriod["offersByAccessibility"]
                    __offers = []

                    for item in offers:
                        subOffers = item["offers"]
                        for subOffer in subOffers:
                            offer = Offer(**subOffer)

                            __offers.append(offer._asdict())

                    availabilities[name]["offers"][_type] = __offers

        return availabilities

    def __dining_request(self, url: str, max_retries: int = 3, **kwargs):
        """
        A wrapper for the dining request function that handles throttling.
        """
        res = self.request("get", url, **kwargs)

        if res.status_code == 428:
            print("Request throttled. Retrying...")
            if max_retries > 0:
                self.reauth()
                return self.__dining_request(url, max_retries - 1, **kwargs)
            raise Exception("Max retries exceeded.")

        return res

    """
        UTILITY FUNCTIONS 
    """

    def reauth(self):
        """
        Re-authenticates the API.
        """
        self.refresh()

        self.auth = self.auth_status()

        if not self.auth.isLoggedIn or not self.auth.isSecure:
            self.login()

        self.load_pre_conditions()  # load the dining res pre-conditions

        print("Refreshed auth status:", self.auth)

        self.update_cookies()

    def fmt_date(self, date: str | int | datetime, fmt: str = "%H:%M"):
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
        elif isinstance(date, int):
            return datetime.fromtimestamp(date).strftime(fmt)
        else:
            raise Exception("Unable to normalize date - Unknown type.")

    def login(self, __max_retries=3):
        """
        Logs into the host website.

        Args:
            __max_retries (int, optional): The maximum number of retries to attempt. Defaults to 3.
        """
        self.get(f"https://{self.host}.com/login/")
        frame = self.find_element(By.XPATH, '//*[@id="oneid-iframe"]')
        self.switch_to.frame(frame)  # switch to the login frame

        self.find_element(By.XPATH, '//*[@id="InputIdentityFlowValue"]').send_keys(
            os.getenv("DISNEY_USERNAME")
        )  # populate the email

        self.find_element(
            By.XPATH, '//*[@id="BtnSubmit"]'
        ).click()  # click the submit button

        WebDriverWait(self, 10).until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    '//*[@id="InputPassword"]',
                )
            )
        )  # wait for the element to load

        self.find_element(By.XPATH, '//*[@id="InputPassword"]').send_keys(
            os.getenv("DISNEY_PASSWORD")
        )  # populate the password field

        self.find_element(
            By.XPATH, '//*[@id="BtnSubmit"]'
        ).click()  # click the login button
        self.switch_to.default_content()  # switch to the page context

        WebDriverWait(self, 10).until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "/html/body/wdpr-ui-universal-layout/div[7]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[2]/div[1]/a",
                )
            )
        )  # wait until the login has completed.

        self.auth = self.auth_status()  # collect the auth status

        if not self.auth.isLoggedIn:
            self.delete_all_cookies()
            self.refresh()
            if __max_retries > 0:  # retry if we failed (up to `max_retries` time)
                print(f"Login failed. Retrying... {4 - __max_retries}")
                self.login(__max_retries - 1)
            else:
                raise Exception("Login failed.")  # login failed

        self.load_pre_conditions()  # load the dining res pre-conditions

    def load_pre_conditions(self):
        """
        Loads the pre-conditions for the dining reservation page.

        Raises:
            Exception: If the pre-conditions fail to load.

        """
        endpoint = f"https://{self.host}.com/dine-res/availability"
        if self.current_url != endpoint:
            self.get(endpoint)
        print("Loading pre-conditions...")
        WebDriverWait(self, timeout=30).until(
            EC.invisibility_of_element_located((By.XPATH, '//*[@id="sec-cpt-if"]'))
        )
        print("Pre-conditions loaded.")

    def load_cookies(self):
        """
        Loads the cookies from the cookie file.
        """
        if os.path.exists(COOKIE_LOC):
            with open(COOKIE_LOC, "r") as f:
                cookies = json.load(f)
                self.update_cookies(cookies)
                self.refresh()
                WebDriverWait(self, 10).until(
                    EC.visibility_of_element_located(
                        (
                            By.XPATH,
                            "/html/body/wdpr-ui-universal-layout/div[7]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[2]/div[1]/a",
                        )
                    )
                )

    def update_cookies(self, cookies: list[dict[str, str]] = None):
        """
        Updates the cookies for the driver and requests session.
        """
        cookies = self.get_cookies() if cookies is None else cookies

        for cookie in cookies:
            self.add_cookie(cookie)
            self.requests_session.cookies.set(cookie["name"], cookie["value"])

    def dump_cookies(self):
        """
        Dumps the cookies to the cookie file.
        """
        with open(COOKIE_LOC, "w") as f:
            json.dump(self.get_cookies(), f, indent=4)

    def auth_status(self):
        """
        Gets the authentication status.
        """
        auth_status = self.auth

        try:
            res = self.request(
                "get", f"https://{self.host}.com/authentication/status/", timeout=10
            )

            auth_status = AuthenticationStatus(**res.json())

        except Exception:
            pass
        # assert res.status_code == 200, f'Expected 200, got {res.status_code}'

        if not auth_status.isLoggedIn:
            if os.path.exists(COOKIE_LOC):
                os.remove(COOKIE_LOC)
            self.delete_all_cookies()
            self.refresh()
        else:
            self.update_cookies()
            self.dump_cookies()

        return auth_status
