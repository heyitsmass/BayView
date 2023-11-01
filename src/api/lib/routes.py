from datetime import datetime
from typing import Literal

from flask import Flask, request
from .app import driver
from .abc import HTTPResponse


driver.init()

app = Flask(__name__)


@app.route("/test", methods=["GET"])
def test():
    return {"ok": True}, 200


@app.route("/tickets/<facility>", methods=["GET"])
def get_tickets(
    facility: None | Literal["ak", "hs", "ep", "mk"] = None
) -> HTTPResponse:
    kwargs = {
        "startDate": request.args.get("startDate"),
        "endDate": request.args.get("endDate"),
        "numDays": request.args.get("numDays"),
        "numMonths": request.args.get("numMonths"),
    }

    """
    Retrieve a list of tickets for a given ticket type.

    Returns:
        A JSON response containing a list of tickets and prices for the given type.
        If an error occurs, a JSON response with an error message and a 500 status code is returned.
    """
    # return {"error": "This endpoint is not implemented yet."}, 500

    return driver.dispatch("get_tickets", facility, **kwargs)


@app.route("/dining/<partySize>", methods=["GET"])
def get_dining_availability(
    partySize: int,
) -> HTTPResponse:
    """
    Returns the dining availability for a given party size, booking date, start time, and end time.

    Args:
        partySize (int): The size of the dining party.

    Returns:
        dict: A dictionary containing the dining availability for the given party size.
    """
    bookingDate: str = request.args.get("bookingDate")
    startTime: str | int | datetime = request.args.get("startTime")
    endTime: str | int | datetime = request.args.get("endTime")

    return driver.dispatch("get_dining", partySize, bookingDate, startTime, endTime)


@app.route("/dining/calendar", methods=["GET"])
def get_calendar() -> HTTPResponse:
    """
    Retrieves the dining calendar from the driver and returns it.

    Returns:
        Tuple: A tuple containing the dining calendar and the HTTP status code.

    """
    return driver.dispatch("get_dining_calendar")


@app.route("/resorts/tickets/<type>", methods=["GET"])
def get_resort_tickets(type: Literal["adult", "child"]) -> HTTPResponse:
    """
    Get resort tickets for a given ticket type.

    Args:
        type (Literal["adult", "child"]): The type of ticket to retrieve.

    Returns:
        Tuple: A tuple containing the resort tickets and the HTTP status code.
    """
    return driver.dispatch("get_resort_tickets", type == "adult")


@app.route("/blockout-dates/<facility>", methods=["GET"])
def get_blackout_dates(
    facility: None | Literal["ak", "hs", "ep", "mk"]
) -> HTTPResponse:
    """
    Returns a list of blackout dates for the specified facility and product types.

    Args:
        facility (str): The facility code for which to retrieve blackout dates.
        productTypes (str): A comma-separated string of product types to retrieve blackout dates for.
        numMonths (int): The number of months to retrieve blackout dates for.

    Returns:
        Tuple: A tuple containing the blackout dates for the specified facility and product types and the HTTP status code.
    """
    productTypes = request.args.get("passes", "").split(",")
    numMonths = request.args.get("numMonths")

    return driver.dispatch("get_blackout_dates", facility, productTypes, numMonths)


@app.route("/parks", methods=["GET"])
def get_parks() -> HTTPResponse:
    """
    Retrieve a list of parks from the database.

    Returns:
         Tuple: A tuple containing the list of parks and the HTTP status code.
    """

    return driver.dispatch("get_parks")


@app.route("/passes", methods=["GET"])
def get_passes() -> HTTPResponse:
    """
    Endpoint to retrieve passes from the driver.

    Returns:
       Tuple: A tuple containing the list of passes and the HTTP status code.
    """

    return driver.dispatch("get_passes")