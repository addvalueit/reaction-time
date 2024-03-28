import psycopg2

def lambda_handler(event, context):
    
    insert_reaction_time(None, None, None)
    # print(lambda_handler(None, None))
    return {
        'Input: event': event,
        'statusCode': 200,
        'body': 'Hello World'
    }

def insert_reaction_time(user_id, reaction_time, db_connection):
    try:
        cursor = db_connection.cursor()
        current_time = datetime.now()
        cursor.execute("""
            INSERT INTO reaction_times (time, tms_insert, user_id)
            VALUES (%s, %s, %s)
        """, (reaction_time, current_time, user_id))
        db_connection.commit()
        print("Dati inseriti correttamente.")
    except Exception as e:
        print("Errore durante l'inserimento dei dati:", e)
