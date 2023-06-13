#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

rm -f './celerybeat.pid'
exec celery -A data_bureau beat -l INFO
