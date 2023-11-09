from ..lib.app import app
import time

client = app.test_client()


class TestRoutes:
    def test_test(self):
        """It should return a 200 response."""
        res = client.get("/test")
        assert res.status_code == 200

    def test_cached(self):
        """It should return a 200 response."""
        res = client.get("/test/cached")
        assert res.status_code == 200

        st = time.time()

        res = client.get("/test/cached")

        et = time.time()

        assert res.status_code == 200
        assert et - st < 1

    def test_memo(self):
        res = client.get("/test/memo/1")

        assert res.status_code == 200

        st = time.time()

        res = client.get("/test/memo/1")

        et = time.time()

        assert res.status_code == 200
        assert et - st < 1
    
    def test_get_tickets(self):
        res = client.get("/tickets/mk")

        assert res.status_code == 200

        time.sleep(1) 

    def test_get_blockout_dates(self):
        res = client.get("/blockout-dates/mk?passes=disney-sorcerer-pass,&numMonths=1")

        assert res.status_code == 200

        time.sleep(1) 

    def test_get_dining_availability(self):
        res = client.get("/dining/2")

        assert res.status_code == 200

        time.sleep(1) 

    def test_get_calendar(self):
        res = client.get("/dining/calendar")

        assert res.status_code == 200

        time.sleep(1) 

    def test_get_resort_tickets(self):
        res = client.get("/resorts/tickets/adult")

        assert res.status_code == 200

        time.sleep(1) 

    def test_get_parks(self):
        res = client.get("/parks")

        assert res.status_code == 200

        time.sleep(1) 

    def test_get_passes(self):
        res = client.get("/passes")

        assert res.status_code == 200

        time.sleep(1) 
