import * as dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const EnvironmentSchema = z.object({
  ENV: z.string(),
  MONGO_URI: z.string(),
  MONGO_DB: z.string(),
  STRIPE_PRIVATE_KEY: z.string(),
  SENDGRID: z.string(),
  CLOUDFARE_R2_URI: z.string(),
  CLOUDFARE_TOKEN: z.string(),
  CLOUDFARE_ID: z.string(),
  CLOUDFARE_SECRET: z.string(),
})

// Validate the environment variables against the schema
const env = EnvironmentSchema.parse(process.env)
console.log('Environment variables are valid.')
export default env
