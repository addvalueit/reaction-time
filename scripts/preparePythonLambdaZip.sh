#!/bin/sh

#Install packages with pip install --target ./package <packagename>
#example pip install aws-psycopg2 -t ./package 

#Define an argument for the main file
LAMBDA_NAME=$1
MAIN_FILE=$LAMBDA_NAME.py

#Move into the root directory
cd ..

#Move into the lambda directory
cd lambda/$LAMBDA_NAME/python/

#Give a guide if no argument is provided
if [ -z "$MAIN_FILE" ]; then
    echo "Usage: $0 <main file>"
    exit 1
fi

#Output an error if the main file is empty or doesn't exist
if [ -z "$MAIN_FILE" ] || [ ! -f "$MAIN_FILE" ]; then
    echo "Error: File '$MAIN_FILE' not found"
    exit 1
fi

cd package/

zip -r ../my-deployment-package.zip .

cd ..

zip -g my-deployment-package.zip $MAIN_FILE
