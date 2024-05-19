#!/bin/bash
cd src

gunicorn -b 0.0.0.0:80 -w 1 wsgi:app