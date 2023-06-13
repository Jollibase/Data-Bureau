#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

python /app/manage.py collectstatic --noinput
python /app/manage.py migrate

# python manage.py runserver 

gunicorn data_bureau.asgi:application -k uvicorn.workers.UvicornWorker --reload -w 2 --bind 0.0.0.0:8000 --chdir=/app
