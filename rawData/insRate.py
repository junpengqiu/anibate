import mysql.connector
from tryRead import *

mydb = mysql.connector.connect(
  host="localhost",
  user="harry",
  passwd="testD123!",
  database="Anibate"
)

mycursor = mydb.cursor()

maxPrint = rating.shape[0]
maxPrint=5000
cPrint = 0

def execCom(sql,val):
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except:
        print(val)

mycursor.execute("SELECT id FROM Anime")
myresult = mycursor.fetchall()
anime_id_set_total = set(map(lambda tup: tup[0], myresult))
print("total number of anime: " + str(len(anime_id_set_total)))

mycursor.execute("SELECT anime_id FROM Rate")
myresult = mycursor.fetchall()
anime_id_set_already = set(map(lambda tup: tup[0], myresult))
print("inserted number of anime: " + str(len(anime_id_set_already)))

#what needs to be done:
anime_id_set = anime_id_set_total - anime_id_set_already
print("number of anime needed to insert: " + str(len(anime_id_set)))

sql = "INSERT Rate VALUES (%s, %s, %s)"
for index, row in rating.iterrows():
    if row['anime_id'] in anime_id_set:
        toIns = [row['user_id'], row['anime_id'], row['rating']]
        execCom(sql, tuple(map(int, toIns)))
        cPrint += 1
        if cPrint % maxPrint == 0:
            print(str(cPrint) + " commits made")

