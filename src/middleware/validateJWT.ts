import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function validateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']
  const privateKey = process.env.NEXTAUTH_SECRET

  if (!privateKey || !token) {
    console.log(`Error[SERVER](${new Date().toDateString()}): invalid token > ${token}`)
    res.status(403).end()
    return
  }

  jwt.verify(token, privateKey, (err, tokenData) => {
    if (err) {
      console.log(`Error[SERVER](${new Date().toDateString()}): invalid token`)
      res.status(403).end()
      return
    }
    console.log(`Info[SERVER](${new Date().toDateString()}): valid token, ${tokenData}`)
    next()
  })

}

export default validateJWT
