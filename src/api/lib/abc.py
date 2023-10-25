from typing import NamedTuple

"https://disneyworld.disney.go.com/authentication/status/"

"""
    CSRF data returned from the endpoint.
"""

class CSRF(NamedTuple):
    token: str
    header: str

"""
    Authentication status returned from the endpoint.
"""

class AuthenticationStatus(NamedTuple):
    csrf: CSRF
    isLoggedIn: bool
    isSecure: bool
    swid: None | str = None


"https://disneyworld.disney.go.com/authentication/get-client-token/"


"""
    Client token returned from the endpoint.
"""


class AccessToken(NamedTuple):
    access_token: str
    expires_in: int


"https://api.wdprapps.disney.com/pep/profile?isUser=True&brand=wdw&locale=en-us&userType=GUEST"

"""
    Avatar data returned from the endpoint.
"""


class Avatar(NamedTuple):
    id: str
    title: str
    url: str


"""
    Self media links returned from the endpoint.
"""


class SelfLinks(NamedTuple):
    href: str


"""
    Links returned from the endpoint.
"""


class Links(NamedTuple):
    self: SelfLinks


"""
    Notification response returned from the endpoint.
"""


class NotificationResponse(NamedTuple):
    startItem: int
    itemLimit: int
    itemCount: str
    receivedInvitations: list[str]
    links: Links


"""
    Guest identifier returned from the endpoint.
"""


class GuestIdentifier(NamedTuple):
    type: str
    value: str


"""
    User data returned from the endpoint.
"""


class User(NamedTuple):
    avatar: Avatar
    notificationResponse: NotificationResponse
    firstName: str
    lastName: str
    email: str
    guestIdentifiers: list[GuestIdentifier]
    affiliations: list[str]
    messageBanner: str
    asyncMessagingToken: None | str = None


"""
    Profile returned from the endpoint.
"""


class Profile(NamedTuple):
    user: User


"https://disneyworld.disney.go.com/dine-res/api/calendar-days"

"""
    Booking date ranges returned from the endpoint.
"""


class BookingDateRanges(NamedTuple):
    startDate: str
    endDate: str


"""
    Calendar days returned from the endpoint.
"""


class CalendarDays(NamedTuple):
    bookingDateRanges: BookingDateRanges
    statusCode: int


"https://disneyworld.disney.go.com/dine-res/api/availability/<party-size>/<YYYY-MM-DD>/<time-start>:<time-end>/"


"""
    Meal period info returned from the endpoint.
"""


class MealPeriodInfo(NamedTuple):
    type: str
    name: str
    experience: str
    priceLegend: str
    primaryCuisineType: str


"""
    Restaurant returned from the endpoint.
"""


class Restaurant(NamedTuple):
    id: str
    name: str
    description: str
    mealPeriodType: str
    priceRange: str
    experienceType: str
    primaryCuisineType: str
    serviceStyle: str
    ancestorLocationParkResort: str
    ancestorLocationLandArea: str
    urlFriendlyId: str
    fastPassId: bool
    admissionRequired: bool
    disneyOwned: bool
    hasAssociatedServices: bool
    quickServiceAvailable: bool
    resservationsRecommended: bool
    hasDiningEventsAssociated: bool
    location: str
    type: str
    media: dict
    offers: dict
    facets: list
    descriptions: dict
    webLinks: dict
    mealPeriodInfo: list[MealPeriodInfo]


"""
    Event times returned from the endpoint.
"""


class EventTimes(NamedTuple):
    restaurant: dict[str, Restaurant]


"""
    Dining event returned from the endpoint.
"""


class DiningEvent(NamedTuple):
    name: str
    id: str
    description: str
    media: dict
    eventTimes: list[EventTimes]


"""
    Availability response returned from the endpoint.
"""


class AvailabilityResponse(NamedTuple):
    restaurant: dict[str, Restaurant]
    diningEvent: dict[str, DiningEvent]
    dinnerShow: str
    statusCode: int


"""
    Availability returned from the endpoint.
"""


class StartingPrice(NamedTuple):
    subtotal: str
    currency: str
    tax: str
    total: str
    pricePerDay: str


"""
    Ticket returned from the endpoint.
"""


class Ticket(NamedTuple):
    name: str
    numDays: int
    startingFromPrice: StartingPrice
    priceDates: list[str]


"""
    Product type returned from the endpoint.
"""


class ProductType(NamedTuple):
    productType: str
    discountGroup: str
    addOn: None | str = None


"""
    Product returned from the endpoint.
"""


class Product(NamedTuple):
    productType: ProductType
    isVariablePricing: bool
    tickets: list[Ticket]


"""
    Tickets returned from the endpoint.
"""


class Offer(NamedTuple):
    offerId: str
    time: str
    label: str


"""
    Offers returned from the endpoint.
"""


class DiningRes(NamedTuple):
    id: str
    name: str
    description: str
    fastPassPlus: bool
    mealPeriodInfo: list[dict]
    disneyOwned: bool
    priceRange: str
    serviceStyle: None | str
    type: str


"""
    Dining reservations returned from the endpoint.
"""


class SupportedPass(NamedTuple):
    availNumMonths: int | None
    displayName: str
    displayOrder: int
    icon: str
    iconEndColor: str
    iconStartColor: str
    isSupported: bool
    passId: str
    configInstanceId: str


"""
    Dining reservations returned from the endpoint.
"""


class SupportedPark(NamedTuple):
    isSupported: bool
    parkId: str
    parkType: str
    sortOrder: int
    configInstanceId: str
