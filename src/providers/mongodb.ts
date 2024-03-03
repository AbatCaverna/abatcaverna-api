import { Db, MongoClient } from 'mongodb'

import ENVIRONMENT from '../util/environments'

type Connection = {
  database: Db
}

async function connectMongo(): Promise<Connection> {
  const URI = ENVIRONMENT.MONGO_URI
  const DATABASE_NAME = ENVIRONMENT.MONGO_DB
  const options = {}

  if (!URI) {
    throw new Error('Please add your Mongo URI to .env.local')
  }

  if (!DATABASE_NAME) {
    throw new Error('Please add your Mongo Database name to .env.local')
  }

  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  const client = new MongoClient(URI, options)
  const clientPromise = client.connect()
  try {
    const database = (await clientPromise).db(DATABASE_NAME)
    console.info(`LOG[SERVER](${new Date().toDateString()}): Connected to database ${DATABASE_NAME}!`)
    return { database }
  } catch (error) {
    console.error(`Error[SERVER](${new Date().toDateString()}): Database connection error!`, error)
    throw new Error('Could not connect to database server!')
  }

}

export default connectMongo
