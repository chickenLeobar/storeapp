#!/bin/sh

## stop  script if any simple commands fail
python3 manage.py check
pipenv install
pipenv run make
pipenv run migrate
pipenv run dev
