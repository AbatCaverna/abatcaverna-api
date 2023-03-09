import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'


import moradoresService from '../service/moradorService'
import UserService from '../service/userService'
import returnHashString from '../util/crypto'
import { Role } from '../util/types'

type Credentials = {
  username: string
  password: string
}

const SessionController = {
  async morador(req: Request<Credentials>, res: Response) {
    const { username, password } = req.body
    const privateKey = process.env.NEXTAUTH_SECRET
    try {
      if (!username) {
        return res.status(422).send({ message: 'Missing arguments'})
      }

      const morador = await moradoresService.showOne(username)

      if (!morador) {
        console.info(`Warning[SERVER](${new Date().toDateString()}): User not found!`)
        return res.status(400).send({ message: 'User does not found'})
      }
      
      if (returnHashString(password) !== morador.senha) {
        console.info(`Warning[SERVER](${new Date().toDateString()}): User incorrect!`)
        return res.status(422).send({ message: 'Error'})
      }

      console.log(privateKey)

      if (privateKey === undefined) {
        console.error(`Error[SERVER](${new Date().toDateString()}): Must provide a NEXTAUTH_SECRET env var`)
        throw new Error('Must provide a NEXTAUTH_SECRET env var')
      }

      const jwt_token = jwt.sign(morador, privateKey, {
        expiresIn: 60 * 60 * 24 * 30, // 30 dias
        algorithm: 'HS512'
      })
      
      return res.send({
        message: 'Sucesso',
        user: {
          ...morador,
          role: Role.cavernoso,
          token: jwt_token
        }
      })
    } catch (error) {
      return res.status(500).send({ message: 'Something went wrong', error})
    }

  },
  async user(req: Request<Credentials>, res: Response) {
    const { user } = req.body

    try {
      const response = await UserService.createUserIfNotInDB(user)

      return res.status(200).send({ message: 'Sucess', user: response })
      
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: 'Something went wrong', error})
    }
    
  }
}

export default SessionController
