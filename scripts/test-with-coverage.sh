#! /usr/bin/env bash

export JUNIT_REPORT_PATH=./test-reports/$1/report.xml
nyc \
  --all \
  --reporter text --reporter html \
  --include "dist/src/**.js" \
  --report-dir "./test-reports/$1-coverage" \
  mocha \
    --require source-map-support/register \
    --recursive \
    --timeout 10000 \
    --reporter mocha-jenkins-reporter \
'dist/test/TestConfiguration.js' "$2"