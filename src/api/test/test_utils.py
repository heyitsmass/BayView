import dotenv
import time
import os
from datetime import datetime
from ..lib.utils import create_password, fmt_date

dotenv.load_dotenv()


class TestUtils:
    def test_create_password(self):
        curr = os.getenv("DISNEY_PASSWORD")
        new = create_password(update=False)  # don't update the .env file

        assert curr != new

    def test_fmt_date(self):
        _time = time.time()
        _datetime = datetime.fromtimestamp(_time)
        _str = _datetime.strftime("%H:%M")

        assert fmt_date(_time) == fmt_date(_datetime) == fmt_date(_str)

        _time = time.time()
        _datetime = datetime.fromtimestamp(_time)
        _str = _datetime.strftime("%Y-%m-%d")

        assert (
            fmt_date(_time, "%Y-%d-%m")
            == fmt_date(_datetime, "%Y-%d-%m")
            == fmt_date(_str, "%Y-%d-%m")
        )
