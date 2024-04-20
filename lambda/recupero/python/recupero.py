import psycopg2
from datetime import datetime
import os

class ReactionTime:
    def __init__(self, id: int, time: int, tms_insert: datetime, user_id: int, name: str):
        self.id = id
        self.time = time
        self.tms_insert = tms_insert
        self.user_id = user_id
        self.name = name

    def to_dict(self):
        return {
            "id": self.id,
            "time": self.time,
            "tms_insert": self.tms_insert.strftime("%Y-%m-%d %H:%M:%S"),
            "user_id": self.user_id,
            "name": self.name
        }

def lambda_handler(event, context):
    response = []
    with psycopg2.connect(dsn=os.getenv("DATABASE_DSN")) as conn:
        reaction_times = get_all_reaction_times(conn)

        for i, time in enumerate(reaction_times):
            response.append(ReactionTime(time[0], time[1], time[2], time[3], time[4]).to_dict())   #[i] = ReactionTime(time[0], time[1], time[2], time[3], time[4]).to_dict()


    return response


def get_all_reaction_times(db_connection):
    try:
        cursor = db_connection.cursor()
        cursor.execute("SELECT reaction_times.id, reaction_times.time, reaction_times.tms_insert, reaction_times.user_id, users.name FROM reaction_times JOIN users ON reaction_times.user_id = users.id WHERE (reaction_times.user_id, reaction_times.time) IN (SELECT user_id, MIN(time) FROM reaction_times GROUP BY user_id) ORDER BY reaction_times.time ASC;")
        records = cursor.fetchall()
        return records
    except Exception as e:
        print("Errore durante il recupero dei dati:", e)
        return []
