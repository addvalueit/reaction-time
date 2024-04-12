package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {

	//Basic Lambda
	pulumi.Run(func(ctx *pulumi.Context) error {
		inserimentoLambda, err := lambda.NewFunction(ctx, "inserimento_api", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("../../lambda/zips/inserimento.zip"),
			Name:    pulumi.String("inserimento_api"),
			Role:    pulumi.String("arn:aws:iam::000000000000:role/dummy-role"),
			Handler: pulumi.String("bootstrap"),
			Runtime: pulumi.String("provided.al2023"),

			Environment: &lambda.FunctionEnvironmentArgs{
				Variables: pulumi.StringMap{
					"DATABASE_DSN": pulumi.String("user=postgres password=password host=postgres port=5432 dbname=reactionTime sslmode=disable"),
				},
			},
		})

		if err != nil {
			return err
		}
		ctx.Export("lambda_inserimento_id", inserimentoLambda.ID())
		ctx.Export("lambda_inserimento_urn", inserimentoLambda.URN())

		loginLambda, err := lambda.NewFunction(ctx, "login_api", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("../../lambda/zips/login.zip"),
			Name:    pulumi.String("login_api"),
			Role:    pulumi.String("arn:aws:iam::000000000000:role/dummy-role"),
			Handler: pulumi.String("bootstrap"),
			Runtime: pulumi.String("provided.al2023"),
			Environment: &lambda.FunctionEnvironmentArgs{
				Variables: pulumi.StringMap{
					"DATABASE_DSN": pulumi.String("user=postgres password=password host=postgres port=5432 dbname=reactionTime sslmode=disable"),
				},
			},
		})

		if err != nil {
			return err
		}
		ctx.Export("lambda_login_id", loginLambda.ID())
		ctx.Export("lambda_login_urn", loginLambda.URN())

		recuperoLambda, err := lambda.NewFunction(ctx, "recupero_api", &lambda.FunctionArgs{
			Code:    pulumi.NewFileArchive("../../lambda/zips/recupero.zip"),
			Name:    pulumi.String("recupero_api"),
			Role:    pulumi.String("arn:aws:iam::000000000000:role/dummy-role"),
			Handler: pulumi.String("recupero.Recupero::handleRequest"),
			Runtime: pulumi.String("java17"),
			Environment: &lambda.FunctionEnvironmentArgs{
				Variables: pulumi.StringMap{
					"DATABASE_JDBC_URL": pulumi.String("jdbc:postgresql://postgres:5432/reactionTime?sslmode=disable&user=postgres&password=password"),
				},
			},
		})

		if err != nil {
			return err
		}
		ctx.Export("lambda_recupero_id", recuperoLambda.ID())
		ctx.Export("lambda_recupero_urn", recuperoLambda.URN())

		return nil
	})
}
