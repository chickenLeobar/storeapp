#!/bin/sh

## stop  script if any simple commands fail
pipenv install
pipenv run make
pipenv run migrate
pipenv run dev
