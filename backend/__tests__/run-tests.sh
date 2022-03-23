#!/bin/bash

docker build -f Dockerfile.mongo -t mongo_container .
MONGO_CONTAINER_ID=$(docker run --detach --name=mongo_container_test --publish 27017:27017 mongo_container mongod --replSet rs0)

echo "$(docker inspect --format='{{.State.Status}}' "$MONGO_CONTAINER_ID")"
until [ running == "$(docker inspect --format='{{.State.Status}}' "$MONGO_CONTAINER_ID")" ]
do
    echo "waiting for mongo container..."
    echo "$(docker inspect --format='{{.State.Status}}' "$MONGO_CONTAINER_ID")"
    sleep 0.5
done


# kill database containers
function cleanup {
  echo "Killing Mongo Container: $MONGO_CONTAINER_ID"
  docker rm -f "$MONGO_CONTAINER_ID"
}

trap cleanup EXIT

sleep 10

# run test
yarn workspace backend run test