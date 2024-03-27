package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"

	"github.com/addvalueit/reaction-time/inserimento/internal/database"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jackc/pgx/v5"
)

type ReactionTime struct {
	UserId int64 `json:"user-id"`
	Time   int64 `json:"time"`
}

func HandleLambdaEvent(ctx context.Context, event *ReactionTime) error {
	if event == nil {
		slog.Error("received nil event")
		return fmt.Errorf("received nil event")
	}

	conn, err := pgx.Connect(ctx, os.Getenv("DATABASE_DSN"))
	if err != nil {
		slog.Error(err.Error())
		return err
	}

	slog.Info("Correctly connected to database")

	defer conn.Close(ctx)

	queries := database.New(conn)

	_, err = queries.InsertReactionTime(ctx, database.InsertReactionTimeParams{Time: event.Time, UserID: event.UserId})

	if err != nil {
		slog.Error(err.Error())
		return err
	}

	return nil
}

func main() {
	lambda.Start(HandleLambdaEvent)
}
