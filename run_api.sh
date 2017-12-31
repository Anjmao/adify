#!/bin/bash

#envfile=.env
#for l in $(cat $envfile); do export $l; done
export DATASTORE_EMULATOR_HOST=localhost:8000
export DATASTORE_PROJECT_ID=pi-docker
cd api
realize start