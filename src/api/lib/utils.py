import string
from datetime import datetime
from random import choice as random_choice

import dotenv


def create_password(update: bool = True):
    pw = "".join(
        random_choice(string.ascii_letters + string.digits + string.punctuation)
        for i in range(10)
    )

    if update:
        dotenv.set_key(
            dotenv.find_dotenv(), "DISNEY_PASSWORD", pw
        )  # set the password in the .env file

    return pw


def fmt_date(date: str | int | datetime, fmt: str = "%H:%M"):
    """
    Formats the date into the specified format. (Defaults to %H:%M)
    """
    if isinstance(date, str):
        try:
            return datetime.fromisoformat(date).strftime(fmt)
        except ValueError:
            try:
                return datetime.strptime(date, fmt).strftime(fmt)
            except ValueError:
                raise Exception("Unable to normalize date - Invalid format.")
    elif isinstance(date, datetime):
        return date.strftime(fmt)
    elif isinstance(date, int | float):
        return datetime.fromtimestamp(date).strftime(fmt)
    else:
        raise Exception("Unable to normalize date - Unknown type.")
