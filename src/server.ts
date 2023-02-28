import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'

import route from './routes'

dotenv.config()

const app = express()

// set security headers
app.use(helmet())
app.use(cors())

app.use(express.json())

app.use(route)

app.listen(3333, () => console.log('server running on port 3333'))
