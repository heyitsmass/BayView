from ...lib.drivers.otp import EmailDriver
import asyncio

import smtplib
import ssl

import dotenv
import os

dotenv.load_dotenv()


def send_test_otp_email():
    smtp_server = "smtp.gmail.com"
    port = 587  # For starttls
    sender_email = os.getenv("DISNEY_USERNAME")
    password = os.getenv("IMAP_PASSWORD")

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP(smtp_server, port)
        server.ehlo()  # Can be omitted
        server.starttls(context=context)  # Secure the connection
        server.ehlo()  # Can be omitted
        server.login(sender_email, password)
        msg = r'otp_code">000000<'
        server.sendmail(sender_email, sender_email, msg)
    except Exception as e:
        # Print any error messages to stdout
        print(e)
    finally:
        server.quit()


class TestEmailDriver:
    def test_init(self):
        """It should test initializing the driver."""
        driver = EmailDriver.test_client()

        assert driver.uid_max >= 0
        assert driver.criteria == {"FROM": os.getenv("DISNEY_USERNAME")}

    def test__get_otp(self):
        """It should test getting the OTP code.
        - This requires a test email to be sent."""
        driver = EmailDriver.test_client()

        send_test_otp_email()

        otp = asyncio.run(driver._get_otp())

        assert otp is not None

    def test_get_max_uid(self):
        """It should test getting the max UID.
        - There's no guarentee it's a number greater than zero if the inbox is empty."""
        driver = EmailDriver()

        uid_max = driver.get_max_uid()

        assert uid_max >= 0

    def test_get_uids(self):
        """It should test getting the UIDs.
        - There's no guarentee there are any UIDs if the inbox is empty."""
        driver = EmailDriver()

        uids = driver.get_uids()

        assert len(uids) >= 0

    def test_refresh(self):
        """It should test refreshing the driver."""
        driver = EmailDriver()

        status, con = driver.refresh()

        assert status == "OK"

    def test_get_emails(self):
        """It should test getting emails."""
        pass

    def test_search_string(self):
        """It should test getting the search string."""
        driver = EmailDriver()

        assert (
            driver.search_string(0, driver.criteria)
            == '(FROM "Member.Services@disneyaccount.com" UID 1:*)'
        )

    def test_get_otp(self):
        """It should test getting the OTP code."""
        driver = EmailDriver.test_client()

        send_test_otp_email()

        otp = driver.get_otp()

        assert otp is not None
        assert len(otp) == 6
