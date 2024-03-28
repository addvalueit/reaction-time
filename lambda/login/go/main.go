package main

import (
	"context"
	"fmt"
	"github.com/addvalueit/reaction-time/login/internal/database"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jackc/pgx/v5"
	"log"
	"log/slog"
	"os"
)

type Login struct {
	Name string `json:"name"`
}

type Response struct {
	Name   string `json:"name"`
	UserId int64  `json:"user-id"`
}

func HandleLambdaEvent(ctx context.Context, event *Login) (*Response, error) {

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	if event == nil {
		slog.Error("received nil event")
		return nil, fmt.Errorf("received nil event")
	}

	conn, err := pgx.Connect(ctx, os.Getenv("DATABASE_DSN"))
	if err != nil {
		slog.Error(err.Error())
		return nil, err
	}

	slog.Info("Correctly connected to database")

	defer conn.Close(ctx)

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

	return &Response{UserId: user.ID, Name: user.Name}, nil
}

func main() {
	lambda.Start(HandleLambdaEvent)
}
