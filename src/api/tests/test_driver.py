import os

from src.my import new_abc as abc
from src.my.test import Driver


driver = Driver()
# driver.init()


class TestDriver:
    """Tests driver."""

    def test_clear_cookies(self):
        """Tests clearing cookies."""

        driver.clear_cookies()

        assert len(driver.get_cookies()) == 0, "Failed to clear cookies."
        assert (
            len(list(driver.requests_session.cookies)) == 0
        ), "Failed to clear cookies."

    def test_save_cookies(self):
        """Tests saving cookies."""
        if os.path.isfile("./data/cookies.json"):
            os.remove("./data/cookies.json")

            driver.save_cookies()

            assert os.path.isfile("./data/cookies.json"), "Failed to save cookies."

    def test_update_cookies(self):
        """Tests getting cookies."""
        driver.get("https://disneyworld.disney.go.com/")

        driver.requests_session.cookies.clear()

        driver.update_cookies()

        assert len(driver.requests_session.cookies) > 0, "Failed to get cookies."

    def test_reload_cookies(self):
        """Tests reloading cookies."""

        driver.get("https://disneyworld.disney.go.com/")
        driver.save_cookies()

        driver.clear_cookies()

        driver.reload_cookies()

        assert len(driver.get_cookies()) > 0, "Failed to reload cookies."

    def test_init_driver(self):
        """Tests initializing driver."""
        # driver.quit()

        driver.init(hb=False)

        assert driver.last_auth > 0, "Failed to initialize driver."

    def test_init_session(self):
        """Tests initializing session."""
        driver.init_session()

        assert (
            driver.requests_session.headers.get("Authorization", None) is not None
        ), "Failed to initialize session."

    def test_get_client_token(self):
        """Tests getting client token."""

        tok = driver.get_client_token()

        assert tok is not None, "Failed to get client token."

    def test_get_auth_status(self):
        """Tests getting auth status."""

        driver.get("https://disneyworld.disney.go.com/authentication/logout")
        driver.wait_until_page_loads()

        auth = driver.get_auth_status()

        assert auth["isLoggedIn"] is False, "Failed to get auth status."

        driver.login()

        auth = driver.get_auth_status()

        assert auth["isLoggedIn"] is True, "Failed to get auth status."

    def test_check_for_login(self):
        """Tests checking for login."""

        driver.get("https://disneyworld.disney.go.com/")
        driver.wait_until_page_loads()

        assert driver._check_for_login_form() is False, "Failed to check for login."

        driver.get("https://disneyworld.disney.go.com/authentication/login")

        assert driver._check_for_login_form() is True, "Failed to check for login."

    def test_check_for_otp(self):
        """Tests checking for OTP."""

        driver.get("https://disneyworld.disney.go.com/")

        otp = driver._check_for_otp()  # unexpected at this point.

        assert otp is False, "Failed to check for OTP."

    def test_fmt_date(self):
        """Tests formatting date."""
        time_iso_test = "2023-10-30T20:59:05"
        time_int_test = 1698724745
        time_str_test = "2023-10-30"

        time_iso = driver.fmt_date(time_iso_test, fmt="%Y-%m-%d")
        time_int = driver.fmt_date(time_int_test, fmt="%Y-%m-%d")
        time_str = driver.fmt_date(time_str_test, fmt="%Y-%m-%d")

        assert (
            time_iso == "2023-10-30"
        ), f"Failed to format date from iso. {time_iso_test}"
        assert (
            time_int == "2023-10-30"
        ), f"Failed to format date from int. {time_int_test}"
        assert (
            time_str == "2023-10-30"
        ), f"Failed to format date from str. {time_str_test}"

    def test_login(self):
        """Tests logging in."""
        driver.get("https://disneyworld.disney.go.com/authentication/logout")
        driver.reload()
        driver.login()

        assert driver.auth_status["isLoggedIn"] is True, "Failed to login."
        assert driver.auth_status["isSecure"] is True, "Failed to securely login."

    def test_get_parks(self):
        """Tests getting parks."""
        res = driver._get_parks()

        assert isinstance(res, abc.ParkResponse), "Failed to get parks."

    def test_get_passes(self):
        """Tests getting passes."""
        res = driver._get_passes()

        assert isinstance(res, abc.PassResponse), "Failed to get parks."

    def test_get_blockout_dates(self):
        """Tests getting blockout dates."""

        res = driver._get_blockout_dates("ak", ["disney-sorcerer-pass"], 1)

        assert isinstance(
            res, abc.BlackoutDateResponse
        ), "Failed to get blackout dates."

    def test_get_calendar(self):
        """Tests getting calendar."""
        res = driver._get_calendar()

        assert isinstance(res, abc.Calendar), "Failed to get calendar."

    def test_get_dining_availability(self):
        """Tests getting dining availability."""
        driver.refresh_auth(force=True)
        driver.load_preconditions()

        res = driver._get_dining_availability(2)

        assert isinstance(
            res, abc.DiningAvailabilityResponse
        ), "Failed to get availability."

    def test_get_resort_tickets(self):
        """Tests getting resort tickets."""
        res = driver._get_resort_tickets(True)

        assert isinstance(
            res, abc.ResortTicketsResponse
        ), "Failed to get resort tickets."

    def test_get_tickets(self):
        """Tests getting tickets."""
        res = driver._get_tickets()

        assert isinstance(res, abc.TicketsResponse), "Failed to get tickets."
