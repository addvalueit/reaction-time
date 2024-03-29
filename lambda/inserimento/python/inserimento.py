import psycopg2
import json
from datetime import datetime

def lambda_handler(event, context):
    # Configurare i parametri della connessione al database
    db_host = 'postgres' # 'localhost' for local debug / 'postgres' for production
    db_name = 'reactionTime'
    db_user = 'postgres'
    db_password = 'password'
    
    # Connessione al database
    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_password,
        host=db_host,
        port=5432
        # ,port=55432 for local debug / port=5432 for production
    )
    
    # Inserimento di dati fittizi
    insert_reaction_time(1, 10.5, conn)  # Esempio di dati fittizi
    
    reaction_times = get_all_reaction_times(conn)

    # Chiusura della connessione
    conn.close()

    
    return {
        json.dumps(reaction_times, default=str)
    }


def get_all_reaction_times(db_connection):
    try:
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM reaction_times")
        records = cursor.fetchall()
        return records
    except Exception as e:
        print("Errore durante il recupero dei dati:", e)
        return []
    

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


print(lambda_handler(None, None))