GOLANG_BINARY_NAME=bootstrap
INSERIMENTO_NAME=inserimento
LOGIN_NAME=login
RECUPERO_NAME=recupero


localstack_init:
	@echo Starting localstack and all of its components...
	docker logout && cd docker && docker compose up -d
	@echo Done!

lambda_build_inserimento_go:
	@echo Building lambda inserimento GO...
	cd lambda/inserimento/go && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -tags lambda.norpc -o bootstrap main.go && zip ${INSERIMENTO_NAME}.zip bootstrap && rm bootstrap && mv ${INSERIMENTO_NAME}.zip ../../zips/${INSERIMENTO_NAME}.zip
	@echo Done!

lambda_build_login_go:
	@echo Building lambda inserimento GO...
	cd lambda/login/go && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -tags lambda.norpc -o bootstrap main.go && zip ${LOGIN_NAME}.zip bootstrap && rm bootstrap && mv ${LOGIN_NAME}.zip ../../zips/${LOGIN_NAME}.zip
	@echo Done!

lambda_build_recupero_java:
	@echo Building lambda recupero JAVA...
	cd lambda/recupero/java && mvn clean package && mv target/${RECUPERO_NAME}-1.0.jar ../../zips/${RECUPERO_NAME}.zip
	@echo Done!

localstack_update: lambda_build_inserimento_go lambda_build_login_go lambda_build_recupero_java
	@echo Updating localstack
	cd IAC/pulumi && export PULUMI_CONFIG_PASSPHRASE="" && pulumi login --local && pulumi up -s dev -y
	@echo Done!

lambda_build_inserimento_python:
	@echo Building lambda inserimento Python...
	cd scripts && bash preparePythonLambdaZip.sh inserimento
	@echo Done!

lambda_deploy_inserimento_python:
	@echo Deploying lambda inserimento Python...
	cd scripts && bash deployPythonLambda.sh inserimento
	@echo Done!

lambda_build_deploy_inserimento_python: lambda_build_inserimento_python lambda_deploy_inserimento_python
	@echo Done!

lambda_build_recupero_python:
	@echo Building lambda recupero Python...
	cd scripts && bash preparePythonLambdaZip.sh recupero
	@echo Done!

lambda_deploy_recupero_python:
	@echo Deploying lambda recupero Python...
	cd scripts && bash deployPythonLambda.sh recupero
	@echo Done!

lambda_build_deploy_recupero_python: lambda_build_recupero_python lambda_deploy_recupero_python
	@echo Done!

lambda_build_login_python:
	@echo Building lambda login Python...
	cd scripts && bash preparePythonLambdaZip.sh login
	@echo Done!

lambda_deploy_login_python:
	@echo Deploying lambda login Python...
	cd scripts && bash deployPythonLambda.sh login
	@echo Done!

lambda_build_deploy_login_python: lambda_build_login_python lambda_deploy_login_python
	@echo Done!

python_deploy_all_lambdas: lambda_build_deploy_inserimento_python lambda_build_deploy_recupero_python lambda_build_deploy_login_python
	@echo Done!

run_frontend:
	@echo Starting frontend...
	cd frontend/reaction-time && npm install && npm run start
	@echo Done!

install_pulumi:
	@echo Installing pulumi...
	curl -fsSL https://get.pulumi.com | sh && export PATH=$PATH:/home/codespace/.pulumi/bin
	@echo Done!

setup_db:
	@echo Inizio setup db
	cd docker && ls && docker cp init.sql reaction-time-postgres-1:/init.sql && docker exec -it reaction-time-postgres-1 psql -U postgres --dbname=reactionTime -f init.sql
	@echo Fine setup db

build_frontend_from_windows:
	@echo Starting to build frontend...
	cd frontend/reaction-time && rm -r node_modules && npm install && npm run build && cd dist/reaction-time/browser && zip -r ../../../../zips/reaction-time-fe.zip .
	@echo Done!

build_frontend:
	@echo Starting to build frontend...
	cd frontend/reaction-time && npm run build && cd dist/reaction-time/browser && zip -r ../../../../zips/reaction-time-fe.zip .
	@echo Done!


setup: localstack_init localstack_update setup_db run_frontend