import { Request, Response } from 'express'


import moradoresService from '../service/moradorService'
import UserService from '../service/userService'
import returnHashString from '../util/crypto'
import signUser from '../util/signUser'
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

      if (privateKey === undefined) {
        console.error(`Error[SERVER](${new Date().toDateString()}): Must provide a NEXTAUTH_SECRET env var`)
        throw new Error('Must provide a NEXTAUTH_SECRET env var')
      }

      const jwt_token = signUser(morador)

      res.setHeader('Authorization', jwt_token)
      
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

      const jwt_token = signUser(response)

      res.setHeader('Authorization', jwt_token)

      return res.status(200).send({ 
        message: 'Sucess', 
        user: {
          ...response,
          role: Role.usuario,
          token: jwt_token
        }
      })
      
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: 'Something went wrong', error})
    }
    
  }
}

export default SessionController
