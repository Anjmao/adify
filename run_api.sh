#!/bin/bash

envfile=.env
for l in $(cat $envfile); do export $l; done

cd api
realize run