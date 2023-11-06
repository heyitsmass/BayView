import logging
import time
from datetime import datetime, timedelta
from typing import Callable, Literal

from .. import abc
from ..utils import fmt_date


class API:
    def __init__(self, driver):
        self.__driver = driver
        self.headers = {
            "User-Agent": driver.user_agent,
            "Accept-Encoding": "gzip, deflate, utf-8",
            "Content-Type": "application/json",
            "Authorization": driver.auth_manager.bearer_auth(),
        }
        self.__lastRefresh = time.time()

    def request(self, method: str, url: str, **kwargs):
        if time.time() - self.__lastRefresh > abc.FIVE_MINUTES:
            self.headers.update(
                {"Authorization": self.__driver.auth_manager.bearer_auth()}
            )

        return self.__driver.request(method, url, **kwargs)

    def __test(self, functions: list[Callable], args: list = [{}]):
        tot = 0
        for i, func in enumerate(functions):
            try:
                st = time.time()
                func(**args[i])
                et = time.time()
                logging.info(f"{func.__name__} took {et - st} seconds.")
                tot += et - st
            except Exception as e:
                logging.error(e)

        return tot / len(functions)

    def status(self):
        avg_time = self.__test(
            [self.get_parks, self.get_passes, self.get_tickets],
            [
                {},
                {},
                {
                    "startDate": "2021-10-01",
                    "endDate": "2021-10-02",
                    "numDays": 1,
                    "numMonths": 1,
                },
            ],
        )
        logging.info(f"Average response time: {avg_time} seconds.")

        return abc.StatusResponse(
            last_auth=self.__driver.auth_manager.last_auth(),
            auth_status=self.__driver.auth_status,
            response_time=avg_time,
        )

    def get_profile(self):
        swid = self.__driver.get_cookie("SWID").get("value", None)

        if swid is None:
            raise Exception("SWID cookie not found - Not logged in.")
        logging.warning(swid)

        headers = {
            "Authorization": self.__driver.auth_manager.bearer_auth(),
        }

        headers.update(self.headers)

        res = self.request(
            "get",
            f"https://disneyworld.disney.go.com/profile-api/profile-svc/profile-service/guests/{swid}/compact-profile/?site=all",
            headers=headers,
        )

        if res.status_code != abc.STATUS_OK:
            return logging.warning(f"Failed to get profile: {res.status_code}")

        return abc.Profile(**res.json())

    def get_parks(self):
        """Gets the parks."""
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/passes/blockout-dates/api/get-parks",
            headers=self.headers,
        )

        if res.status_code != abc.STATUS_OK:
            return logging.warning(f"Failed to get parks: {res.status_code}")

        # print(str(res.content, encoding="br"))

        data = res.json()

        parks = {
            park.parkId: park._asdict()
            for park in (abc.Park(**_park) for _park in data["supported-parks"])
        }
        ids = list(parks.keys())

        return abc.ParkResponse(
            ids,
            parks,
        )

    def get_passes(self):
        """Gets the passes."""
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/passes/blockout-dates/api/get-passes/",
            headers=self.headers,
        )

        if res.status_code != abc.STATUS_OK:
            return logging.warning(f"Failed to get passes: {res.status_code}")

        data = res.json()

        passes = {
            pass_.passId: pass_._asdict()
            for pass_ in (abc.Pass(**_pass) for _pass in data["supported-passes"])
        }
        ids = list(passes.keys())
        return abc.PassResponse(
            ids,
            passes,
        )

    def get_tickets(
        self,
        startDate: str = datetime.now().strftime("%Y-%m-%d"),
        endDate: str | None = None,
        discountGroup: str = "std-gst",
        storeId: str = "wdw",
        numDays: int | str = 1,
        numMonths: int | str = 1,
        facility: str | None = None,
    ):
        """Gets the tickets."""
        facility = None if facility is None else facility.lower()
        numDays = int(numDays)
        if not endDate:
            endDate = (
                datetime.strptime(startDate, "%Y-%m-%d")
                + timedelta(days=numDays)
                + timedelta(days=30 * numMonths)
            ).strftime("%Y-%m-%d")

        res = self.request(
            "get",
            f"https://disneyworld.disney.go.com/api/lexicon-view-assembler-service/wdw/tickets/product-types/theme-parks/prices?discountGroup={discountGroup}&startDate={startDate}&storeId={storeId}&endDate={endDate}&numDays={numDays}&fpAvailability=false",
            headers=self.headers,
        )

        if res.status_code != abc.STATUS_OK:
            return logging.warning(f"Failed to get tickets: {res.status_code}")

        data = res.json()

        mapped_names = {
            "mk": "Magic Kingdom",
            "ep": "Epcot",
            "ak": "Animal Kingdom",
            "hs": "Hollywood Studios",
        }

        tickets = {
            date["date"]: abc.TicketPrice(
                date=date["date"],
                validityStartDate=date["validityStartDate"],
                validityEndDate=date["validityEndDate"],
                currency=date["currency"],
                availability=date["availability"],
                lowestPricePerDay=date["lowestPricePerDay"],
                highestPricePerDay=date["highestPricePerDay"],
                lowestPrice=date["lowestPrice"],
                highestPrice=date["highestPrice"],
                prices=[
                    abc.Price(
                        name=mapped_names.get(
                            price["id"].split("_")[-1],
                            "Park Hopper Plus"
                            if "PHP" in price["id"]
                            else "Park Hopper",
                        ),
                        ageGroup=price["ageGroup"],
                        pricePerDay=price["pricePerDay"],
                        subtotal=price["subtotal"],
                        tax=price["tax"],
                        available=price["availability"],
                        validFrom=price["validityStartDate"],
                        validTo=price["validityEndDate"],
                    )
                    for price in date["pricing"]
                    if facility is None or facility in price["id"]
                ],
            )
            for point in data["pricingCalendar"]
            for date in point["dates"]
        }

        return abc.TicketsResponse(tickets)

    def get_calendar(self):
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/dine-res/api/calendar-days",
            headers=self.headers,
        )

        if res.status_code != abc.STATUS_OK:
            return abc.Calendar(  # return the default
                abc.BookingDateRanges(
                    startDate=datetime.now().strftime("%Y-%m-%d"),
                    endDate=datetime.fromtimestamp(time.time() + abc.ONE_DAY).strftime(
                        "%Y-%m-%d"
                    ),
                ),
                200,
            )

        return abc.Calendar(**res.json())

    def get_resort_tickets(self, is_adult: bool):
        """Gets the resort tickets."""
        res = self.request(
            "get",
            "https://disneyworld.disney.go.com/api/lexicon-view-assembler-service/wdw/tickets/product-listing?storeId=wdw&affiliations=STD_GST",
            headers=self.headers,
        )

        if res.status_code != abc.STATUS_OK:
            return logging.warning(f"Failed to get resort tickets: {res.status_code}")

        data = res.json()

        resorts = {}

        for group in data.get("discountGroups", []):
            for product, product_data in (
                data["discountGroups"][group].get("products", {}).items()
            ):
                product_type = abc.ProductType(**product_data.get("productKey", {}))
                is_variable_pricing = product_data.get("isVariablePricing", False)
                ticket_days = product_data.get("ticketDays", {})
                tickets = [
                    abc.Ticket(
                        **{
                            "name": ticket["names"]["standardName"]["text"],
                            "numDays": ticket["numDays"],
                            "startingFromPrice": abc.StartingPrice(
                                **ticket["startingFromPrice"]
                            ),
                            "priceDates": ticket["priceDates"],
                        }
                    )
                    for ticket in ticket_days.get("adult" if is_adult else "child", [])
                ]

                resorts[product] = abc.ResortTicket(
                    product_type, is_variable_pricing, tickets
                )

        return abc.ResortTicketsResponse(resorts)

    def get_blockout_dates(
        self,
        facility: None | Literal["ak", "hs", "ep", "mk"],
        productTypes: list[str],
        numMonths: int | str = 1,
    ):
        """Gets the blackout dates."""
        res = self.request(
            "get",
            f"https://disneyworld.disney.go.com/passes/blockout-dates/api/get-availability/?product-types={','.join(productTypes)}&destinationId=WDW&numMonths={numMonths}",
            headers=self.headers,
        )
        logging.warning(res.url)

        if res.status_code != abc.STATUS_OK:
            return logging.warning(f"Failed to get blockout dates: {res.status_code}")

        facilityMap = {"ak": "WDW_AK", "hs": "WDW_HS", "ep": "WDW_EP", "mk": "WDW_MK"}

        data = res.json()

        obj = {}

        for i, res in enumerate(data):
            dates = []
            for value in res["availabilities"]:
                if value["facilityId"] == facilityMap[facility]:
                    dates.append(
                        {
                            "date": value["date"],
                            "openTime": value.get("facilityOpeningTime", None),
                            "closeTime": value.get("facilityClosingTime", None),
                            "available": value["slots"][0]["available"],
                        }
                    )

            obj[productTypes[i]] = dates

        return abc.BlockoutDateResponse(
            facility, facilityMap[facility], productTypes, numMonths, obj
        )

    def get_dining_availability(
        self,
        partySize: int,
        bookingDate: str | int | datetime = datetime.now().strftime("%Y-%m-%d"),
        startTime: datetime | int | str = datetime.now().strftime("%H:%M"),
        endTime: datetime | int | str = datetime.fromtimestamp(
            time.time() + abc.ONE_HOUR
        ).strftime("%H:%M"),
    ):
        """Gets the dining availability."""
        # self.load_preconditions()

        if int(partySize) > 10:
            raise Exception("Party size cannot be greater than 10.")

        timeStart = fmt_date(startTime)
        timeEnd = fmt_date(endTime)

        if timeStart > timeEnd:
            raise Exception("Start time cannot be greater than end time.")

        bookingDate = fmt_date(bookingDate, "%Y-%m-%d")

        today = datetime.now().strftime("%Y-%m-%d")

        if today > bookingDate:
            raise Exception("Date cannot be in the past.")

        res = self.request(
            "get",
            f"https://disneyworld.disney.go.com/dine-res/api/availability/{partySize}/{bookingDate}/{timeStart},{timeEnd}",
            headers=self.headers,
        )

        if res.status_code != abc.STATUS_OK:
            return logging.warning(
                f"Failed to get dining availability: {res.status_code}"
            )

        availability = res.json()["restaurant"]

        keys = [
            "id",
            "name",
            "description",
            "fastPassPlus",
            "mealPeriodInfo",
            "disneyOwned",
            "priceRange",
            "urlFriendlyId",
            "admissionRequired",
        ]
        availabilities = {}
        for key in availability:
            obj = {k: availability[key].get(k, "") for k in keys}
            name = obj["name"]
            obj["media"] = availability[key]["media"]["finderStandardThumb"]

            availabilities[name] = obj

            offers = availability[key]["offers"]
            availabilities[name]["offers"] = {}

            for value in offers:
                for mealPeriod in offers[value]:
                    # _type = mealPeriod["type"]
                    _type = mealPeriod["mealPeriodType"]
                    __offers = []

                    for item in mealPeriod["offersByAccessibility"]:
                        subOffers = item["offers"]
                        for subOffer in subOffers:
                            offer = abc.Offer(**subOffer)

                            __offers.append(offer)

                    availabilities[name]["offers"][_type] = __offers

        return abc.DiningAvailabilityResponse(availabilities)
