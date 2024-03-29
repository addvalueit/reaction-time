import psycopg2
from datetime import datetime

class ReactionTime:
    def __init__(self, id: int, time: int, tms_insert: datetime, user_id: int):
        self.id = id
        self.time = time
        self.tms_insert = tms_insert
        self.user_id = user_id

    def to_dict(self):
        return {
            "id": self.id,
            "time": self.time,
            "tms_insert": self.tms_insert.strftime("%Y-%m-%d %H:%M:%S"),
            "user_id": self.user_id
        }

def lambda_handler(event, context):
    # Configurare i parametri della connessione al database
    db_host = 'postgres' # 'localhost' for local debug / 'postgres' for production
    db_name = 'reactionTime'
    db_user = 'postgres'
    db_password = 'password'
    db_port = 5432 # port=55432 for local debug / port=5432 for production
    
    # Connessione al database
    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port
    )
    
    # Inserimento di dati fittizi
    insert_reaction_time(1, 10.5, conn)  # Esempio di dati fittizi
    
    conn.close()

    return {
        "statusCode": 200,
        "body": None
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
