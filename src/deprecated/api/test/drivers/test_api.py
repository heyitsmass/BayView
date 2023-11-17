from ...lib.drivers.web import Driver
from ...lib import abc


class TestAPI:
    def test_request(self):
        """It should make a request from the parent driver."""
        driver = Driver.test_client()

        res = driver.api.request(
            "get", "https://disneyworld.disney.go.com/authentication/get-client-token/"
        )

        assert res.status_code == abc.STATUS_OK

        driver.quit()

    def test_status(self):
        """It should return the aggregated average response time of the following endpoints:
        - get_parks
        - get_passes
        - get_tickets"""
        driver = Driver.test_client()

        status = driver.api.status()

        assert isinstance(status, abc.StatusResponse)

    def test_get_parks(self):
        """It should return the parks."""
        driver = Driver.test_client()

        parks = driver.api.get_parks()

        assert isinstance(parks, abc.ParkResponse)

        driver.quit()

    def test_get_passes(self):
        """It should return the passes."""

        driver = Driver.test_client()

        passes = driver.api.get_passes()

        assert isinstance(passes, abc.PassResponse)

        driver.quit()

    def test_get_tickets(self):
        """It should return the tickets."""
        driver = Driver.test_client()

        tickets = driver.api.get_tickets()

        assert isinstance(tickets, abc.TicketsResponse)

        driver.quit()

    def test_get_calendar(self):
        """It should return the calendar"""
        driver = Driver.test_client()

        calendar = driver.api.get_calendar()

        assert isinstance(calendar, abc.Calendar)

        driver.quit()

    def test_get_resort_tickets(self):
        """It should return the resort tickets."""
        driver = Driver.test_client()

        tickets = driver.api.get_resort_tickets(True)

        assert isinstance(tickets, abc.ResortTicketsResponse)

        driver.quit()

    def test_get_blockout_dates(self):
        """It should return the pass blockout dates."""

        driver = Driver.test_client()

        blockout_dates = driver.api.get_blockout_dates(
            "ak", ["disney-sorcerer-pass"], 1
        )

        assert isinstance(blockout_dates, abc.BlockoutDateResponse)

        driver.quit()

    def test_get_dining_availability(self):
        """It should return the dining availability.
        - This endpoint requires
            - preconditions to be loaded
            - authentication to be secure."""
        driver = Driver.test_client(login=True, fast=False)

        assert driver.auth_manager.is_secure()

        availabilities = driver.api.get_dining_availability(2)

        assert isinstance(availabilities, abc.DiningAvailabilityResponse)

        driver.quit()

    def test_get_profile(self):
        """It should return the profile of the user.
        - This endpoint requires:
            - authentication to be secure."""

        driver = Driver.test_client(login=True)

        assert driver.auth_manager.is_secure()

        profile = driver.api.get_profile()

        assert isinstance(profile, abc.Profile)

        driver.quit()
