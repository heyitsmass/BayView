from ...lib.drivers.web import Driver


class TestCookieStore:
    def test_load(self):
        """It should load cookies from a file"""
        driver = Driver.test_client()

        driver.cookie_store.save()

        driver.cookie_store.clear()

        driver.cookie_store.load()

        assert len(driver.cookie_store.get()) > 0

        driver.quit()

    def test_save(self):
        """It should save cookies to a file"""
        driver = Driver.test_client()

        if driver.cookie_store.exists():
            driver.cookie_store.delete()

        driver.cookie_store.save()

        assert driver.cookie_store.exists() is True

        driver.quit()

    def test_clear(self):
        """It should clear cookies from the session."""
        driver = Driver.test_client()

        driver.cookie_store.clear()

        assert len(driver.cookie_store.get()) == 0

        driver.quit()

    def test_get(self):
        """It should get cookies from the session."""
        driver = Driver.test_client()

        cookies = driver.cookie_store.get()

        assert len(cookies) > 0

        driver.quit()

    def test_update(self):
        """It should update the cookies in the session."""
        driver = Driver.test_client()

        cookies = driver.cookie_store.get()

        driver.requests_session.cookies.clear()

        driver.cookie_store.update(cookies)

        assert len(driver.requests_session.cookies) > 0

        driver.quit()

    def test_delete(self):
        """It should delete the cookies file."""
        driver = Driver.test_client()

        driver.cookie_store.delete()

        assert driver.cookie_store.exists() is False

        driver.quit()

    def test_exists(self):
        """It should check if the cookies file exists."""
        driver = Driver.test_client()

        driver.cookie_store.delete()

        assert driver.cookie_store.exists() is False

        driver.cookie_store.save()

        assert driver.cookie_store.exists() is True

        driver.quit()
