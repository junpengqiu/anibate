import mysql.connector
from tryRead import *

mydb = mysql.connector.connect(
  host="localhost",
  user="harry",
  passwd="testD123!",
  database="Anibate"
)

mycursor = mydb.cursor()

maxPrint = anime.shape[0]
maxPrint=100
cPrint = 0

def execCom(sql,val):
    try:
        mycursor.execute(sql, toIns)
        mydb.commit()
    except:
        print("bad index " + str(index))

for index, row in anime.iterrows():
    toIns = [row['anime_id'], row['name'], row['type'], row['episodes'], row['rating'], row['members']]
    # episodes
    if toIns[3] == 'Unknown':
        toIns[3] = '0'
    sql = "INSERT Anime VALUES (%s, %s, %s, %s, %s, %s)"
    execCom(sql, tuple(toIns))
    cPrint += 1
