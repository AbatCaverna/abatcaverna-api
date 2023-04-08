import * as dotenv from 'dotenv'
dotenv.config()

const ENVIRONMENT = {
  env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGODB_URI,
  mongo_db: process.env.MONGODB_DB_NAME,
  stripe_private_key: process.env.STRIPE_PRIVATE_KEY,
  sendgrid: process.env.SENDGRID_API_KEY
}

export default ENVIRONMENT
