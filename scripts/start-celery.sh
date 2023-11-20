#!/bin/bash

set -o errexit
set -o nounset

# watchfiles \
#   --filter python \
exec celery -A data_bureau worker --loglevel=info -Q high_priority,default
