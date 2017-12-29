#!/bin/bash

docker run -it -d \
    -h gdatastore \
    -p 8000:8000 \
    google/cloud-sdk:183.0.0 gcloud beta emulators datastore start \
    --project=pi-docker \
    --host-port gdatastore:8000 \
    --no-store-on-disk