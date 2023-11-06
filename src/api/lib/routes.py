import logging
import time
from datetime import datetime
from typing import Literal

from flask import request

from .abc import HTTPResponse
from .app import app, cache, driver


@app.route("/test", methods=["GET"])
def test():
    return {"ok": True}, 200


@app.route("/test/cached", methods=["GET"])
@cache.cached()
def test_cached():
    time.sleep(
        1
    )  # if the cache is working the response time will be much faster than 1 second
    return {"ok": True}, 200


@app.route("/test/memo/<value>", methods=["GET"])
@cache.memoize()
def test_memo(value: str):
    time.sleep(1)
    return {"value": value}, 200


@app.route("/tickets/<facility>", methods=["GET"])
@cache.memoize()
def get_tickets(
    facility: None | Literal["ak", "hs", "ep", "mk"] = None
) -> HTTPResponse:
    kwargs = {
        "facility": facility,
        "startDate": request.args.get("startDate", datetime.now().strftime("%Y-%m-%d")),
        "endDate": request.args.get("endDate", None),
        "numDays": request.args.get("numDays", 1),
        "numMonths": request.args.get("numMonths", 1),
    }

    return driver.dispatch("get_tickets", **kwargs)


@app.route("/dining/<partySize>", methods=["GET"])
@cache.cached(source_check=True)
def get_dining_availability(
    partySize: int,
) -> HTTPResponse:
    kwargs = {
        "partySize": partySize,
        "bookingDate": request.args.get(
            "bookingDate", datetime.now().strftime("%Y-%m-%d")
        ),
        "startTime": request.args.get("startTime", datetime.now().strftime("%H:%M")),
        "endTime": request.args.get(
            "endTime", datetime.fromtimestamp(time.time() + 3600).strftime("%H:%M")
        ),
    }

    return driver.dispatch(
        "get_dining_availability",
        **kwargs,
    )


@app.route("/dining/calendar", methods=["GET"])
@cache.cached()
def get_calendar() -> HTTPResponse:
    return driver.dispatch("get_calendar")


@app.route("/resorts/tickets/<isAdult>", methods=["GET"])
@cache.memoize()
def get_resort_tickets(isAdult: Literal["adult", "child"]) -> HTTPResponse:
    kwargs = {
        "is_adult": isAdult == "adult",
    }

    return driver.dispatch("get_resort_tickets", **kwargs)


@app.route("/blockout-dates/<facility>", methods=["GET"])
@cache.memoize()
def get_blackout_dates(
    facility: None | Literal["ak", "hs", "ep", "mk"]
) -> HTTPResponse:
    kwargs = {
        "facility": facility,
        "productTypes": request.args.get("passes", "").split(",")[:-1],
        "numMonths": request.args.get("numMonths"),
    }

    logging.warning(
        f"kwargs: {kwargs}",
    )

    return driver.dispatch("get_blockout_dates", **kwargs)


@app.route("/parks", methods=["GET"])
@cache.cached()
def get_parks() -> HTTPResponse:
    return driver.dispatch("get_parks")


@app.route("/passes", methods=["GET"])
@cache.cached()
def get_passes() -> HTTPResponse:
    return driver.dispatch("get_passes")
