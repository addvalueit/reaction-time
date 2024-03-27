GOLANG_BINARY_NAME=bootstrap
INSERIMENTO_NAME=inserimento


lambda_build_inserimento_go:
	@echo Building lambda inserimento GO...
	cd lambda/inserimento/go && GOOS=linux GOARCH=amd64 go build -tags lambda.norpc -o bootstrap main.go && zip ${INSERIMENTO_NAME}.zip bootstrap && mv ${INSERIMENTO_NAME}.zip ../../zips/${INSERIMENTO_NAME}.zip
	@echo Done!

