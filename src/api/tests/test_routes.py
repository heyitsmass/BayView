from src.my.routes import app
from src.my.abc import STATUS_OK

client = app.test_client()

class RouteTests:
    def test_get_parks(self):
        """Tests getting parks."""
        res = client.get("/parks/")

        assert res.status_code == STATUS_OK, "Failed to get parks."

    def test_get_passes(self):
        """Tests getting passes."""
        res = client.get("/passes/")

        assert res.status_code == STATUS_OK, "Failed to get passes."

    def test_get_blockout_dates(self):
        """Tests getting blockout dates."""

        res = client.get("/blockout-dates/ak?passes=disney-sorcerer-pass,&numMonths=1")

        assert res.status_code == STATUS_OK, "Failed to get blackout dates."

    def test_get_calendar(self):
        """Tests getting calendar."""
        res = client.get("/dining/calendar")
        assert res.status_code == STATUS_OK, "Failed to get calendar."

    def test_get_dining_availability(self):
        """Tests getting dining availability."""

        res = client.get(
            "/dining/2?bookingDate=2021-10-10&startTime=12:00&endTime=13:00"
        )

        assert res.status_code == STATUS_OK, "Failed to get availability."

    def test_get_resort_tickets(self):
        """Tests getting resort tickets."""
        res = client.get("/resorts/tickets/adult")

        assert res.status_code == STATUS_OK, "Failed to get resort tickets."

    def test_get_tickets(self):
        """Tests getting tickets."""
        res = client.get(
            "/tickets/ak?startDate=2021-10-10&endDate=2021-10-11&numDays=2&numMonths=1"
        )

        assert res.status_code == STATUS_OK, "Failed to get tickets."
