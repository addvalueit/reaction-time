#!/bin/sh

#Install packages with pip install --target ./package <packagename>
#example pip install aws-psycopg2 -t ./package 
cd package/

zip -r ../my-deployment-package.zip .

cd ..

zip -g my-deployment-package.zip login.py
