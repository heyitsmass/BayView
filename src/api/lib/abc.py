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
