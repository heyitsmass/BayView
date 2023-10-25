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

