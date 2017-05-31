#!/bin/bash
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

# Deploy UI app
cd $dir/client
ng build --prod --aot
gcloud app deploy -q

# Deploy API app
cd $dir/server
tsc
gcloud app deploy -q
