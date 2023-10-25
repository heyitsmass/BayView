import asyncio
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

