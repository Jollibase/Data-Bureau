#!/bin/bash

set -o errexit
set -o nounset

watchfiles \
  --filter python \
  'celery -A data_bureau worker --loglevel=info'
