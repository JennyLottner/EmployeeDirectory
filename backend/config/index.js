import dotenv from 'dotenv'
dotenv.config() // Load environment variables from a .env file into process.env

// Configuration object to store database connection details
export var config = {
  dbURL: process.env.DB_URL,
  dbName: process.env.DB_NAME
}

config.isGuestMode = true  // Additional configuration property for guest mode