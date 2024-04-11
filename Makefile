GOLANG_BINARY_NAME=bootstrap
INSERIMENTO_NAME=inserimento
LOGIN_NAME=login


localstack_init:
	@echo Starting localstack and all of its components...
	cd docker && docker compose up -d
	@echo Done!

lambda_build_inserimento_go:
	@echo Building lambda inserimento GO...
	cd lambda/inserimento/go && GOOS=linux GOARCH=amd64 go build -tags lambda.norpc -o bootstrap main.go && zip ${INSERIMENTO_NAME}.zip bootstrap && rm bootstrap && mv ${INSERIMENTO_NAME}.zip ../../zips/${INSERIMENTO_NAME}.zip
	@echo Done!

lambda_build_login_go:
	@echo Building lambda inserimento GO...
	cd lambda/login/go && GOOS=linux GOARCH=amd64 go build -tags lambda.norpc -o bootstrap main.go && zip ${LOGIN_NAME}.zip bootstrap && rm bootstrap && mv ${LOGIN_NAME}.zip ../../zips/${LOGIN_NAME}.zip
	@echo Done!

localstack_update: lambda_build_inserimento_go lambda_build_login_go
	@echo Updating localstack
	cd IAC/pulumi && pulumi up
	@echo Done!

lambda_build_inserimento_python:
	@echo Building lambda inserimento Python...
	cd lambda/inserimento/python && bash prepareZip.sh inserimento.py
	@echo Done!

lambda_deploy_inserimento_python:
	@echo Deploying lambda inserimento Python...
	cd lambda/inserimento/python && bash deploy.sh
	@echo Done!

lambda_build_deploy_inserimento_python: lambda_build_inserimento_python lambda_deploy_inserimento_python
	@echo Done!

lambda_build_recupero_python:
	@echo Building lambda recupero Python...
	cd lambda/recupero/python && bash prepareZip.sh recupero.py
	@echo Done!

lambda_deploy_recupero_python:
	@echo Deploying lambda recupero Python...
	cd lambda/recupero/python && bash deploy.sh
	@echo Done!

lambda_build_deploy_recupero_python: lambda_build_recupero_python lambda_deploy_recupero_python
	@echo Done!

lambda_build_login_python:
	@echo Building lambda login Python...
	cd lambda/login/python && bash prepareZip.sh login.py
	@echo Done!

lambda_deploy_login_python:
	@echo Deploying lambda login Python...
	cd lambda/login/python && bash deploy.sh
	@echo Done!

lambda_build_deploy_login_python: lambda_build_login_python lambda_deploy_login_python
	@echo Done!

lambda_buid_deploy_all_pyhton_lambdas: lambda_build_deploy_inserimento_python lambda_build_deploy_recupero_python lambda_build_deploy_login_python
	@echo Done!

run_frontend:
	@echo Starting frontend...
	cd frontend/reaction-time && ng serve --open --live-reload
	@echo Done!

setup:
	@echo Inizio setup ambiente
	cd docker && docker compose up -d
	@echo Fine setup!

setup_db:
	@echo Inizio setup db
	cd docker && ls && docker cp init.sql reaction-time-postgres-1:/init.sql && docker exec -it reaction-time-postgres-1 psql -U postgres --dbname=reactionTime -f init.sql
	@echo Fine setup db
