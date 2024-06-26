#!/bin/bash

LAMBDA_NAME=$1
API_NAME=$1_api
REGION=us-east-1
STAGE=test
LAMBDA_ZIP=../../zips/$1.zip
RUNTIME=python3.8
HANDLER=$1.lambda_handler

# zip ${LAMBDA_ZIP} $1.py my-deployment-package.zip

#Install packages with pip install --target ./package <packagename>
#example pip install --target ./package requests


#Move into the root directory
cd ..

#Move into the lambda directory
cd lambda/$LAMBDA_NAME/python/

# zip -r -g my-deployment-package.zip $1.py package

mv my-deployment-package.zip ${LAMBDA_ZIP}


function fail() {
    echo $2
    exit $1
}

awslocal lambda delete-function --function-name ${API_NAME}

awslocal lambda create-function \
    --region ${REGION} \
    --function-name ${API_NAME} \
    --runtime ${RUNTIME} \
    --handler ${HANDLER} \
    --memory-size 128 \
    --zip-file fileb://${LAMBDA_ZIP} \
    --role arn:aws:iam::000000000000:role/dummy-role \
    --environment "Variables={DATABASE_DSN=user=postgres password=password host=postgres port=5432 dbname=reactionTime sslmode=disable}"

[ $? == 0 ] || fail 1 "Failed: AWS / lambda / create-function"

# LAMBDA_ARN=$(awslocal lambda list-functions --query "Functions[?FunctionName==\`${API_NAME}\`].FunctionArn" --output text --region ${REGION})

# awslocal apigateway create-rest-api \
#     --region ${REGION} \
#     --name ${API_NAME}

# [ $? == 0 ] || fail 2 "Failed: AWS / apigateway / create-rest-api"

# API_ID=$(awslocal apigateway get-rest-apis --query "items[?name==\`${API_NAME}\`].id" --output text --region ${REGION})
# PARENT_RESOURCE_ID=$(awslocal apigateway get-resources --rest-api-id ${API_ID} --query 'items[?path==`/`].id' --output text --region ${REGION})

# awslocal apigateway create-resource \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --parent-id ${PARENT_RESOURCE_ID} \
#     --path-part "{somethingId}"

# [ $? == 0 ] || fail 3 "Failed: AWS / apigateway / create-resource"

# RESOURCE_ID=$(awslocal apigateway get-resources --rest-api-id ${API_ID} --query 'items[?path==`/{somethingId}`].id' --output text --region ${REGION})

# awslocal apigateway put-method \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_ID} \
#     --http-method GET \
#     --request-parameters "method.request.path.somethingId=true" \
#     --authorization-type "NONE" \

# [ $? == 0 ] || fail 4 "Failed: AWS / apigateway / put-method"

# awslocal apigateway put-integration \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_ID} \
#     --http-method GET \
#     --type AWS_PROXY \
#     --integration-http-method POST \
#     --uri arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/${LAMBDA_ARN}/invocations \
#     --passthrough-behavior WHEN_NO_MATCH \

# [ $? == 0 ] || fail 5 "Failed: AWS / apigateway / put-integration"

# awslocal apigateway create-deployment \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --stage-name ${STAGE} \

# [ $? == 0 ] || fail 6 "Failed: AWS / apigateway / create-deployment"

# ENDPOINT=http://localhost:4566/restapis/${API_ID}/${STAGE}/_user_request_/HowMuchIsTheFish


[ $? == 0 ] || fail 2 "ERROR DURING DEPLOYMENT"

# echo "Testing GET:"
# curl -i ${ENDPOINT}

# echo "Testing POST:"
# curl -iX POST ${ENDPOINT}


echo "API successfully deployed"