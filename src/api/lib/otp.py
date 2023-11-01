import asyncio
import email
import imaplib
import os
import re
import time
from itertools import chain
import logging

from dotenv import load_dotenv

load_dotenv()
FIFTEEN_MINUTES = 60 * 15 * 1000


class EmailDriver(imaplib.IMAP4_SSL):
    """A driver for getting the OTP code from the email."""

    def __init__(self):
        imap_url = "imap.gmail.com"

        self.uid_max = 0
        self.criteria = {"FROM": "Member.Services@disneyaccount.com"}  # search criteria

        super().__init__(imap_url)

        logging.info("EmailDriver initialized.")
        username = os.environ.get("DISNEY_USERNAME")
        password = os.environ.get("IMAP_PASSWORD")

        if not username or not password:
            # logging.error("Missing IMAP credentials in .env file.")
            raise Exception("Missing IMAP credentials in .env file.")

        self.login(
            username,
            password,
        )

        logging.info("IMAP login successful.")
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

        else:
            logging.info("No new emails found.")

    def refresh(self):
        return self.noop()

    async def __run(self):
        self.refresh()  # keep alive
        self.st = time.time()  # start time

        while True:
            async for e in self.get_emails():  # get emails
                match = re.search(
                    r'otp_code">([0-9]+)<', e.as_string()
                )  # search for the otp code

                if match:
                    logging.info("OTP code found.")
                    return match.group(1)  # return the otp code

            await asyncio.sleep(5)  # sleep for 5 seconds
            if time.time() - self.st > FIFTEEN_MINUTES:
                logging.error("Timed out waiting for OTP email.")
                raise TimeoutError(
                    "Timed out waiting for OTP email."
                    "\n\t- 15 minutes (Expiration time for OTP code met.)"
                )
            self.refresh()  # keep alive

    def get_otp(self):
        return asyncio.run(
            self.__run()
        )  # run until the timeout is reached or the otp is found


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[logging.FileHandler("./logs/otp.log"), logging.StreamHandler()],
    )
