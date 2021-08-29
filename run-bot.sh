#!/usr/bin/env bash

set -e # exit script on failure
set -u # exit on undeclared variables
set -x # useful for debugging

cd ${WORK_DIR}
BOTNAME=test-bot ts-node new-bot-runner.ts
