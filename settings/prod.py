import datetime
import os

from dotenv import load_dotenv
import dj_database_url

from .local import *

load_dotenv()

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": datetime.timedelta(days=2),
    "REFRESH_TOKEN_LIFETIME": datetime.timedelta(days=7),
}

DATABASES = {
    "default": dj_database_url.parse(os.environ.get("DATABASE_URL"), conn_max_age=600),
}
