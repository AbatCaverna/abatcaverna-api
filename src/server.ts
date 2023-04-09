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

app.use(express.json({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify: function (req: any, res, buf) {
    const url = req.originalUrl
    if (url.startsWith('/webhooks')) {
      req.rawBody = buf.toString()
    }
  }
}))
app.use(express.static('./public'))
app.use(express.static('./uploads'))

app.use(route)

app.listen(
  process.env.PORT || 3333,
  () => console.log(`server running on port ${process.env.PORT || 3333}`)
)
