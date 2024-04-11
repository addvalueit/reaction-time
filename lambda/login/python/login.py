import psycopg2
import os

def lambda_handler(event, context):
    # Extract the user name from the event that triggers the lambda
    if (event) :
        print("Evento presente", event)
    else:
        return {"statusCode": 200, "body": "No event found"}
    user_name = event['name']

    # Connect to the database using the DSN environment variable
    with psycopg2.connect(dsn=os.getenv("DATABASE_DSN")) as conn:
        # Insert the new user into the database
        insert_user(conn, user_name)

        # Prepare a response indicating success
        response = {
            "statusCode": 200,
            "body": {"message": f"User '{user_name}' inserted successfully."}
        }

    return response

def insert_user(db_connection, name):
    try:
        # Create a cursor to execute the insert statement
        cursor = db_connection.cursor()
        # SQL statement to insert a new user
        insert_query = "INSERT INTO users (name) VALUES (%s)"
        # Execute the insert statement
        cursor.execute(insert_query, (name,))
        # Commit the changes to the database
        db_connection.commit()
    except Exception as e:
        print("Error during the insertion:", e)
        # Optionally, handle rollback in case of error
        db_connection.rollback()
