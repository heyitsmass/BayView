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
