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
    response = {}
    with psycopg2.connect(dsn=os.getenv("DATABASE_DSN")) as conn:
        reaction_times = get_all_reaction_times(conn)

        for i, time in enumerate(reaction_times):
            response[i] = ReactionTime(time[0], time[1], time[2], time[3]).to_dict()


    return {
        "statusCode": 200,
        "body": response
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
