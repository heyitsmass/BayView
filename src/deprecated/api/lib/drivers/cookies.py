import json
import logging
import os


class CookieStore:
    def __init__(cls, driver, file: str = "/home/brandon/BayPI/data/cookies.json"):
        cls.path = file
        cls.__driver = driver

    def update(cls, cookies: dict):
        if cookies is None:
            cookies = cls.__driver.get_cookies()  # get the cookies

        for cookie in cookies:
            cls.__driver.add_cookie(cookie)  # add the cookie to the driver
            cls.__driver.session.cookies.set(
                cookie["name"], cookie["value"]
            )  # add the cookie to the requests session

    def load(cls):
        if os.path.isfile(cls.path):
            with open(cls.path, "r", encoding="utf-8") as f:
                try:
                    cookies = json.load(f)
                    cls.update(cookies)
                    logging.info(f"Cookies reloaded from file: {cls.path}")
                except json.JSONDecodeError:
                    logging.warning(f"Failed to load cookies from file: {cls.path}")

    def save(cls):
        with open(cls.path, "w+", encoding="utf-8") as f:
            json.dump(
                cls.get(),
                f,
                ensure_ascii=False,
                indent=4,
            )
            logging.info(f"Cookies saved to file: {cls.path}")

    def clear(cls):
        cls.__driver.delete_all_cookies()
        cls.__driver.session.cookies.clear()
        logging.info("Cookies cleared.")

    def get(cls):
        return cls.__driver.get_cookies()

    def exists(cls):
        return os.path.isfile(cls.path)

    def delete(cls):
        if cls.exists():
            os.remove(cls.path)
            logging.info(f"Cookies file deleted: {cls.path}")
