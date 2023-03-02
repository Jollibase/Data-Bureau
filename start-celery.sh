#!/bin/bash

set -o errexit
set -o nounset

celery -A data_bureau worker -l INFO
