#!/bin/bash
set -e

rm -f /app/tmp/pids/server.pid

if [ "${1}" == "./bin/rails" ] && [ "${2}" == "server" ]; then
  ./bin/rails db:prepare
fi

exec "$@"
