import logging

from dotenv import load_dotenv
from flask import Flask
from flask_caching import Cache

from .drivers.web import Driver

load_dotenv()

driver = Driver()

config = {
    #'DEBUG': True,
    "CACHE_TYPE": "simple",
    "CACHE_DEFAULT_TIMEOUT": 300,
    "PORT": 5000,
}

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[logging.FileHandler("./logs/routes.log"), logging.StreamHandler()],
    )

app = Flask(__name__)
app.logger = logging.getLogger()
app.logger.setLevel(logging.INFO)

app.config.from_mapping(config)
cache = Cache(app)

from . import routes
