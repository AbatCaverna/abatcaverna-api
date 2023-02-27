import { Db, MongoClient } from 'mongodb'

type Connection = {
  database: Db | undefined
}

async function connectMongo(): Promise<Connection> {
  const URI = process.env.MONGODB_URI
  const DATABASE_NAME = process.env.MONGODB_DB_NAME
  const options = {}
  
  if (!process.env.MONGODB_URI || !URI) {
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
    return { database: undefined }
  }

}

export default connectMongo
