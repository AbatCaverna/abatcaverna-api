import connectMongo from '../providers/mongodb'

async function getDatabase() {
  try {
    const { database } = await connectMongo()
    return database
  } catch (error) {
    throw new Error('Error trying to connect to database')      
  }
}

export default getDatabase
