package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	// S3 Example
	// pulumi.Run(func(ctx *pulumi.Context) error {
	// 	// Create an AWS resource (S3 Bucket)
	// 	bucket, err := s3.NewBucket(ctx, "my-bucket", nil)
	// 	if err != nil {
	// 		return err
	// 	}

	// 	// Export the name of the bucket
	// 	ctx.Export("bucketName", bucket.ID())
	// 	return nil
	// })

	//Basic Lambda
	pulumi.Run(func(ctx *pulumi.Context) error {
		lambda, err := lambda.NewFunction(ctx, "inserimento_api", &lambda.FunctionArgs{
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
		ctx.Export("lambda_inserimento_id", lambda.ID())
		ctx.Export("lambda_inserimento_urn", lambda.URN())
		return nil
	})
}
