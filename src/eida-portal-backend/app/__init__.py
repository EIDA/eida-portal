from flask import Flask
from flask_caching import Cache
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

config = {"DEBUG": True, "CACHE_TYPE": "simple", "CACHE_DEFAULT_TIMEOUT": 900}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)
CORS(app)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models

if __name__ == "__main__":
    app.run()
