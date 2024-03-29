import psycopg2
from datetime import datetime
import os

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
    with psycopg2.connect(dsn=os.getenv("DATABASE_DSN")) as conn:
        insert_reaction_time(1, 10.5, conn)  # Esempio di dati fittizi
    
    return {
        "statusCode": 200
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
