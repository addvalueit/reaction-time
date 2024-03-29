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
    
    reaction_times = get_all_reaction_times(conn)

    response = {}
    for i, time in enumerate(reaction_times):
        response[i] = ReactionTime(time[0], time[1], time[2], time[3]).to_dict()

    # Chiusura della connessione
    conn.close()

    return {
        "statusCode": 200,
        "body": response
    }


def get_all_reaction_times(db_connection):
    try:
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM reaction_times LIMIT 10")
        records = cursor.fetchall()
        return records
    except Exception as e:
        print("Errore durante il recupero dei dati:", e)
        return []
