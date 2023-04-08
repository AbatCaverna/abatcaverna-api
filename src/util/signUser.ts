import jwt from 'jsonwebtoken'

import Morador from '../models/morador'
import User from '../models/users'

function signUser(data: Morador | User) {
  const privateKey = process.env.NEXTAUTH_SECRET

  if (!privateKey) throw 'Missing environment data'

  const jwt_token = jwt.sign(data, privateKey, {
    expiresIn: 60 * 60 * 24 * 30, // 30 dias
  })

  return jwt_token
}

export default signUser
