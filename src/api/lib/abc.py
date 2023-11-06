"""Types for the Disney API."""
from typing import NamedTuple, TypeVar, Union

"""Status Codes"""
STATUS_OK = 200
STATUS_BAD_REQUEST = 400
STATUS_UNAUTHORIZED = 401
STATUS_NOT_FOUND = 404
STATUS_TOO_MANY_REQUESTS = 429
STATUS_INTERNAL_SERVER_ERROR = 500
STATUS_NOT_IMPLEMENTED = 501
STATUS_SERVICE_UNAVAILABLE = 503


PASSWORD_LENGTH = 12  # length of the password

# this seems redundant but allows for easy modification of the time limits
# e.g. 1:2s or 1.2:2s
ONE_SECOND = 1
ONE_MINUTE = ONE_SECOND * 60  # 1 minute in seconds
FIVE_MINUTES = 5 * ONE_MINUTE  # 5 minutes in seconds
FIFTEEN_MINUTES = 15 * ONE_MINUTE  # 15 minutes in seconds
ONE_HOUR = 60 * ONE_MINUTE  # 1 hour in seconds
ONE_DAY = ONE_HOUR * 24  # 1 day in seconds

WAIT_TIMEOUT = ONE_SECOND * 3
LOAD_TIMEOUT = ONE_SECOND * 40
REQUEST_TIMEOUT = ONE_SECOND * 10


class AuthCSRF(NamedTuple):
    """CSRF data returned from the endpoint."""

    token: str
    header: str


class Auth(NamedTuple):
    """Authentication status returned from the endpoint."""

    csrf: AuthCSRF | None = None
    isLoggedIn: bool = False
    isSecure: bool = False
    swid: None | str = None


class ClientToken(NamedTuple):
    """Client token returned from the endpoint."""

    access_token: str
    expires_in: int


class Park(NamedTuple):
    """Park data returned from the endpoint."""

    isSupported: bool
    parkId: str
    parkType: str
    sortOrder: int
    configInstanceId: str


class Pass(NamedTuple):
    """Pass data returned from the endpoint."""

    availNumMonths: int | None
    displayName: str
    displayOrder: int
    icon: str
    iconEndColor: str
    iconStartColor: str
    isSupported: bool
    passId: str
    configInstanceId: str


class StartingPrice(NamedTuple):
    """Ticket Starting price data returned from the endpoint."""

    subtotal: str
    currency: str
    tax: str
    total: str
    pricePerDay: str


class Ticket(NamedTuple):
    """Ticket data returned from the endpoint."""

    name: str
    numDays: int
    startingFromPrice: StartingPrice
    priceDates: list[str]


class Hotel(NamedTuple):
    ...


class ProfileAvatar(NamedTuple):
    """Avatar data returned from the endpoint."""

    id: str
    name: str
    media: dict[str, str]


class ProfileLinks(NamedTuple):
    """Media links returned from the endpoint."""

    href: str


class Links(NamedTuple):
    """Links returned from the endpoint."""

    self: ProfileLinks


class ProfileInfo(NamedTuple):
    """Profile info returned from the endpoint."""

    prefix: str
    firstName: str
    lastName: str
    ageBand: str


class Profile(NamedTuple):
    """User data returned from the endpoint."""

    avatar: ProfileAvatar
    favorites: list[str]
    xid: str
    profile: ProfileInfo
    links: Links
    self: ProfileLinks


class BookingDateRanges(NamedTuple):
    """Date ranges returned from the endpoint."""

    startDate: str
    endDate: str


class Calendar(NamedTuple):
    """Calendar data returned from the endpoint."""

    bookingDateRanges: BookingDateRanges
    statusCode: int


class ProductType(NamedTuple):
    """Product type data returned from the endpoint."""

    productType: str
    discountGroup: str
    addOn: None | str = None


class ResortTicket(NamedTuple):
    """Resort ticket data returned from the endpoint."""

    productType: ProductType
    isVariablePricing: bool
    tickets: list[Ticket]


class BlockoutDate(NamedTuple):
    """Blackout date data returned from the endpoint."""

    facilityId: str
    facility: str
    productTypes: list[str]
    numMonths: int
    blackoutDates: dict[str, list[str]]


class Offer(NamedTuple):
    """Offer data returned from the endpoint."""

    offerId: str
    time: str
    label: str


class MealPeriodInfo(NamedTuple):
    """Meal period info returned from the endpoint."""

    type: str
    name: str
    experience: str
    priceLegend: str
    primaryCuisineType: str


class DiningAvailability(NamedTuple):
    """Dining availability data returned from the endpoint."""

    id: str
    name: str
    description: str
    fastPassPlus: bool
    mealPeriodInfo: dict[str, MealPeriodInfo]
    disneyOwned: bool
    priceRange: str
    urlFriendlyId: str
    admissionRequired: bool
    media: dict
    offers: dict[str, list[Offer]]


class ParkTicket(NamedTuple):
    """Park ticket data returned from the endpoint."""

    productType: ProductType
    isVariablePricing: bool
    tickets: list[Ticket]


class Price(NamedTuple):
    """Price data returned from the endpoint."""

    ageGroup: str
    pricePerDay: str
    subtotal: str
    tax: str
    validFrom: str
    validTo: str
    available: bool
    name: str


class TicketPrice(NamedTuple):
    """Ticket price data returned from the endpoint."""

    date: str
    validityStartDate: str
    validityEndDate: str
    currency: str
    lowestPricePerDay: str
    highestPricePerDay: str
    lowestPrice: str
    highestPrice: str
    availability: bool
    prices: list[Price]


### Driver Response Types ###
class ParkResponse(NamedTuple):
    """Park response returned from the driver."""

    ids: list[str]
    parks: dict[str, Park]


class PassResponse(NamedTuple):
    """Pass response returned from the driver."""

    ids: list[str]
    passes: dict[str, Pass]


class BlockoutDateResponse(NamedTuple):
    """Blackout date response returned from the driver."""

    facility: str
    facilityId: str
    productTypes: list[str]
    numMonths: int
    blockoutDates: dict[str, list[str]]


class DiningAvailabilityResponse(NamedTuple):
    """Dining availability response returned from the driver."""

    availabilities: dict[str, DiningAvailability]


class ResortTicketsResponse(NamedTuple):
    """Resort tickets response returned from the driver."""

    tickets: dict[str, ResortTicket]


class TicketsResponse(NamedTuple):
    """Tickets response returned from the driver."""

    tickets: dict[str, TicketPrice]


T = TypeVar("T")


class HTTPResponse(NamedTuple):
    """HTTP response returned from the driver."""

    status_code: Union[
        STATUS_OK,
        STATUS_BAD_REQUEST,
        STATUS_UNAUTHORIZED,
        STATUS_NOT_FOUND,
        STATUS_TOO_MANY_REQUESTS,
        STATUS_INTERNAL_SERVER_ERROR,
        STATUS_NOT_IMPLEMENTED,
        STATUS_SERVICE_UNAVAILABLE,
    ]
    data: T | None = None
    message: str | None = None


class StatusResponse(NamedTuple):
    """Status response returned from the driver."""

    last_auth: str
    auth_status: Auth
    response_time: int


class TestABC:
    # This file does not need tests.
    pass
