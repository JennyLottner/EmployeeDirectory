import configEnv from './env.js'

export var config

if (process.env.NODE_ENV === 'production') {
    config = {
      dbURL: process.env.DB_URL || configEnv.dbURL,
      dbName: process.env.DB_NAME || configEnv.dbName
    }
  } else {
    config = { ...configEnv }
  }

config.isGuestMode = true