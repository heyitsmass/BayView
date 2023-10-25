from datetime import datetime
from typing import Literal

from flask import Flask, request

from .app import driver

app = Flask(__name__)


@app.route("/test", methods=["GET"])
def test():
    return {"ok": True}, 200

