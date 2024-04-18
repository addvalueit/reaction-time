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

        # Get the user ID
        user_id = get_user_id(conn, user_name)

        # Prepare a response indicating success and the user ID
        return {"message": f"User '{user_name}' inserted successfully.", "user-id": user_id}

def get_user_id(db_connection, name):
    try:
        # Create a cursor to execute the select statement
        cursor = db_connection.cursor()
        # SQL statement to select a user by name
        select_query = "SELECT id FROM users WHERE name = %s"
        # Execute the select statement
        cursor.execute(select_query, (name,))
        # Fetch the user ID
        user_id = cursor.fetchone()[0]
        return user_id
    except Exception as e:
        print("Error during the selection:", e)
        # Optionally, handle rollback in case of error
        db_connection.rollback()
        return None

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
