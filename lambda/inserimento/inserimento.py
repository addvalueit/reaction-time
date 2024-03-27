def lambda_handler(event, context):
    return {
        'Input: event': event,
        'statusCode': 200,
        'body': 'Hello World'
    }
