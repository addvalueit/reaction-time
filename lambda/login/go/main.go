package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/addvalueit/reaction-time/login/internal/database"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"log/slog"
	"os"
)

type Login struct {
	Name string `json:"name"`
}

type ApiGatewayResponse struct {
	StatusCode int `json:"statusCode"`
	Headers    struct {
		ContentType string `json:"Content-Type"`
	} `json:"headers"`
	IsBase64Encoded   bool `json:"isBase64Encoded"`
	MultiValueHeaders struct {
		XCustomHeader []string `json:"X-Custom-Header"`
	} `json:"multiValueHeaders"`
	Body string `json:"body"`
}
type Response struct {
	Name   string `json:"name"`
	UserId int64  `json:"user-id"`
}

func HandleLambdaEvent(ctx context.Context, event *Login) (*ApiGatewayResponse, error) {

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	if event == nil {
		slog.Error("received nil event")
		return nil, fmt.Errorf("received nil event")
	}

	conn, err := pgxpool.New(ctx, os.Getenv("DATABASE_DSN"))
	if err != nil {
		slog.Error(err.Error())
		return nil, err
	}

	slog.Info("Correctly connected to database")

	defer conn.Close()

	queries := database.New(conn)

	user, err := queries.GetUserByName(ctx, event.Name)

	if err != nil && err.Error() == "no rows in result set" {
		user, err = queries.InsertUser(ctx, event.Name)
		if err != nil {
			slog.Error(err.Error())
			return nil, err
		}
	} else if err != nil {
		slog.Error(err.Error())
		return nil, err
	}

	resp := Response{
		Name:   user.Name,
		UserId: user.ID,
	}

	b, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println(string(b))

	return &ApiGatewayResponse{
		StatusCode: 200,
		Headers: struct {
			ContentType string `json:"Content-Type"`
		}(struct{ ContentType string }{ContentType: "application/json"}),
		IsBase64Encoded: false,
		Body:            string(b),
	}, nil
}

func main() {
	lambda.Start(HandleLambdaEvent)

}
