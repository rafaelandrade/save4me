#!/bin/bash

docker build -f Dockerfile.postgres -t postgres_container .
POSTGRES_CONTAINER_ID=$(docker run -p 127.0.0.1:5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres_test -d postgres_container)

echo "$(docker inspect --format='{{.State.Status}}' "$POSTGRES_CONTAINER_ID")"
until [ running == "$(docker inspect --format='{{.State.Status}}' "$POSTGRES_CONTAINER_ID")" ]
do
    echo "waiting for postgres container..."
    echo "$(docker inspect --format='{{.State.Status}}' "$POSTGRES_CONTAINER_ID")"
    sleep 0.5
done

MONGO_CONTAINER_ID=$(docker run -p 27017:27017 -d mongo)
echo "Running MongoDB Container: $MONGO_CONTAINER_ID"

# kill database containers
function cleanup {
  echo "Killing PostgreSQL Container: $POSTGRES_CONTAINER_ID"
  docker rm -f "$POSTGRES_CONTAINER_ID"

  echo "Killing MongoDB Container: $MONGO_CONTAINER_ID"
  docker rm -f "$MONGO_CONTAINER_ID"
}

trap cleanup EXIT

sleep 10

# prepare db
NODE_ENV=test npm run initdb

# run test
npm run test:coverage
