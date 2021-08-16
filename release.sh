#!/usr/bin/env bash
#
# semantic-release script.
#
# This file is run from external release system.
# Changes need to be manually copied.

set -euo pipefail

if [ ! -f Dockerfile.release ]; then
  echo "No Dockerfile.release found. Nothing to do."
  exit 0
fi

docker build . -f Dockerfile.release -t teacherspayteachers/ebpf-exporter-deploy:release
docker run -e GITHUB_ACTOR=x-asset-token \
           -e GITHUB_TOKEN=$GITHUB_TOKEN \
           -e NPM_TOKEN=none \
           -t teacherspayteachers/ebpf-exporter-deploy:release \
           make release

echo "Release done."
