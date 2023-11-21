import os
import time
from datetime import datetime

if __name__ != "__main__":
    from .. import abc


class AuthManager:
    def __init__(self, driver):
        self.__driver = driver
        self.__auth = abc.Auth()
        self.__lastRefresh = 0
        self.__tok = None

    def is_expired(self):
        return (
            self.__auth.isLoggedIn is False
            or self.__auth.isSecure is False
            or time.time() - self.__lastRefresh > abc.FIVE_MINUTES
        )

    def last_auth(self):
        return datetime.fromtimestamp(self.__lastRefresh).strftime("%Y-%m-%d %H:%M:%S")

    def is_secure(self):
        return not self.is_expired() and self.__auth.isSecure

    def is_logged_in(self):
        return not self.is_expired() and self.__auth.isLoggedIn

    def is_authenticated(self):
        return not self.is_expired() and self.__auth.isLoggedIn and self.__auth.isSecure

    def client_token(self):
        self.__tok = self.__driver.request(
            "get", "https://disneyworld.disney.go.com/authentication/get-client-token/"
        ).json()["access_token"]
        return self.__tok

    def bearer_auth(self):
        return f"BEARER {self.client_token()}"

    def refresh(self, force: bool = False):
        if not self.is_expired() and not force:
            return self.__auth

        self.__auth = self.status()

        if any([self.__auth.isLoggedIn, self.__auth.isSecure]) is False:
            self.__driver._login()
            self.__lastRefresh = time.time()

            self.__auth = self.status()

            if self.__auth.isSecure:
                self.__driver.cookie_store.save()

        return self.__auth

    def status(self):
        res = self.__driver.request(
            "get",
            "https://disneyworld.disney.go.com/authentication/status",
        )

        if res.status_code != abc.STATUS_OK:
            os.remove(self.__driver.cookie_store.path)
            raise Exception("Failed to get auth status from endpoint.")

        return abc.Auth(**res.json())
