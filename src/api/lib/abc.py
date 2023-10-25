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


