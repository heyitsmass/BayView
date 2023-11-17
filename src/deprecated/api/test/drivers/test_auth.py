from ...lib.drivers.web import Driver


class TestAuthManager:
    def test_status(self):
        driver = Driver.test_client(login=False)

        assert driver.auth_manager.status().isLoggedIn is False

        driver.auth_manager.refresh()

        assert driver.auth_manager.status().isLoggedIn is True

        driver.quit()

    def test_is_expired(self):
        driver = Driver.test_client(login=False)

        assert driver.auth_manager.is_expired() is True

        driver.auth_manager.refresh()

        assert driver.auth_manager.is_expired() is False

        driver.quit()

    def test_is_secure(self):
        driver = Driver.test_client(login=False)

        assert driver.auth_manager.is_secure() is False

        driver.auth_manager.refresh()

        assert driver.auth_manager.is_secure() is True

        driver.quit()

    def test_is_logged_in(self):
        driver = Driver.test_client(login=False)

        assert driver.auth_manager.is_logged_in() is False

        driver.auth_manager.refresh()

        assert driver.auth_manager.is_logged_in() is True

        driver.quit()

    def test_is_authenticated(self):
        driver = Driver.test_client(login=False)

        assert driver.auth_manager.is_authenticated() is False

        driver.auth_manager.refresh()

        assert driver.auth_manager.is_authenticated() is True

        driver.quit()

    def test_client_token(self):
        driver = Driver.test_client(login=False)

        assert driver.auth_manager.client_token() is not None

        driver.quit()

    def test_bearer_auth(self):
        driver = Driver.test_client(login=False)

        assert "BEARER " in driver.auth_manager.bearer_auth()

        driver.quit()

    def test_refresh(self):
        driver = Driver.test_client(login=False)

        assert driver.auth_manager.status().isLoggedIn is False

        driver.auth_manager.refresh()

        assert driver.auth_manager.status().isLoggedIn is True

        driver.quit()
