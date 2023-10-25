from datetime import datetime
from typing import Literal

from flask import Flask, request

from .app import driver

app = Flask(__name__)


@app.route("/test", methods=["GET"])
def test():
    return {"ok": True}, 200


@app.route("/tickets/<facility>", methods=["GET"])
def get_tickets(facility: None | Literal["ak", "hs", "ep", "mk"] = None):
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

    try:
        resorts = driver.get_tickets(**kwargs, facility=facility)
  
    except Exception as e:
        return {"error": str(e)}, 500

    return resorts, 200


@app.route("/dining/<partySize>", methods=["GET"])
def get_dining(
    partySize: int,
):
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

    try:
        availabilities = driver.get_dining_availability(
            int(partySize), bookingDate, startTime, endTime
        )
    except Exception as e:
        return {"error": str(e)}, 500

    return availabilities, 200


    except Exception as e:
        return {"error": str(e)}, 500

    return resorts, 200
