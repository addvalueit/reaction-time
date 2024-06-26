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
            "id": self.id, # TODO rimuovere
            "time": self.time,
            "tms_insert": self.tms_insert.strftime("%Y-%m-%d %H:%M:%S"), # TODO rimuovere
            "user_id": self.user_id
        }

def lambda_handler(event: dict, context):
    with psycopg2.connect(dsn=os.getenv("DATABASE_DSN")) as conn:
        insert_reaction_time(event["user-id"], event["time"], conn)  # Esempio di dati fittizi


def insert_reaction_time(user_id, reaction_time, db_connection):
    try:
        cursor = db_connection.cursor()
        cursor.execute("""
            INSERT INTO reaction_times (time, user_id, tms_insert)
            VALUES (%s, %s, NOW())
        """, (reaction_time, user_id))
        db_connection.commit()
        print("Dati inseriti correttamente.")
    except Exception as e:
        print("Errore durante l'inserimento dei dati:", e)
