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