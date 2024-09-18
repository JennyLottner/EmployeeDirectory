import dotenv from 'dotenv'
dotenv.config()

export var config = {
  dbURL: process.env.DB_URL,
  dbName: process.env.DB_NAME
}

config.isGuestMode = true