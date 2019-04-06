import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="harry",
  passwd="testD123!",
  database="Anibate"
)

mycursor = mydb.cursor()
