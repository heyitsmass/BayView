import asyncio
import email
import imaplib
import logging
import os
import re
import time
from itertools import chain

import dotenv
import nest_asyncio

from .. import abc

if __name__ != "__main__":
    nest_asyncio.apply()

dotenv.load_dotenv()


class EmailDriver(imaplib.IMAP4_SSL):
    """A driver for getting the OTP code from the email."""

    def __init__(self, _from: str = "Member.Services@disneyaccount.com"):
        imap_url = "imap.gmail.com"

        self.uid_max = 0
        self.criteria = {"FROM": _from}  # search criteria

        super().__init__(imap_url)

        self.login(
            os.getenv("DISNEY_USERNAME"),
            os.getenv("IMAP_PASSWORD"),
        )

        self.select("Inbox")  # select the inbox folder
        self.uid_max = self.get_max_uid()  # get the latest email
        self.st = 0  # start time

    def get_max_uid(self):
        self.uids = self.get_uids()
        uid_max = self.uid_max

        if len(self.uids) > 0:
            uid_max = max(self.uids)

        return uid_max

    def get_uids(self):
        result, data = self.uid(
            "search", None, self.search_string(self.uid_max, self.criteria)
        )
        return [int(s) for s in data[0].split()]

    def search_string(self, uid_max, criteria):
        c = list(map(lambda t: (t[0], '"' + str(t[1]) + '"'), criteria.items())) + [
            ("UID", "%d:*" % (uid_max + 1))
        ]
        return "(%s)" % " ".join(chain(*c))

    async def get_emails(self):
        uid = self.get_max_uid()
        if uid > self.uid_max:
            result, data = self.uid("fetch", str(uid), "(RFC822)")  # fetch the email
            self.uid_max = uid  # update the latest email

            yield email.message_from_bytes(data[0][1])  # return the email

    def refresh(self):
        return self.noop()

    async def _get_otp(self, polling_interval: int = 5):
        self.refresh()  # keep alive
        self.st = time.time()  # start time
        self.hb = time.time()  # heartbeat
        self.ref = time.time()  # refresh

        otp: str | None = None

        while otp is None:
            async for e in self.get_emails():  # get emails
                match = re.search(
                    r'otp_code">([0-9]+)<', e.as_string()
                )  # search for the otp code

                if match:
                    otp = match.group(1)  # return the otp code

            await asyncio.sleep(polling_interval)  # sleep for 5 seconds

            if time.time() - self.st > abc.FIFTEEN_MINUTES:
                raise TimeoutError(
                    "Timed out waiting for OTP email."
                    "\n\t- 15 minutes (Expiration time for OTP code met.)"
                )

            if time.time() - self.hb > abc.ONE_MINUTE:
                logging.warning("Still waiting for OTP email.")
                self.hb = time.time()  # heartbeat

            if time.time() - self.ref > 5:
                self.refresh()  # keep alive
                self.ref = time.time()  # refresh

        return otp

    def get_otp(self):
        logging.info("Waiting for OTP email.")
        return asyncio.run(self._get_otp(polling_interval=1))

    def test_client():
        return EmailDriver(_from=os.getenv("DISNEY_USERNAME"))
