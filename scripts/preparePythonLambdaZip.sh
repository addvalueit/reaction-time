#!/bin/sh

#Install packages with pip install --target ./package <packagename>
#example pip install aws-psycopg2 -t ./package 

#Define an argument for the main file
lambdaname=$1
mainFile=$lambdaname.py

#Move into the root directory
cd ..

#Move into the lambda directory
cd lambda/$lambdaname/python/

#Give a guide if no argument is provided
if [ -z "$mainFile" ]; then
    echo "Usage: $0 <main file>"
    exit 1
fi

#Output an error if the main file is empty or doesn't exist
if [ -z "$mainFile" ] || [ ! -f "$mainFile" ]; then
    echo "Error: File '$mainFile' not found"
    exit 1
fi

cd package/

zip -r ../my-deployment-package.zip .

cd ..

zip -g my-deployment-package.zip $mainFile
