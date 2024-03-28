#!/bin/sh

#Install packages with pip install --target ./package <packagename>
#example pip install --target ./package requests
cd package/

zip -r ../my-deployment-package.zip .

cd ..

zip -g my-deployment-package.zip inserimento.py
