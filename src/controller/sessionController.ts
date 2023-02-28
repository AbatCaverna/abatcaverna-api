import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import connectMongo from '../providers/mongodb'
import MoradoresRepository from '../repository/moradorRepository'
import MoradoresService from '../service/moradorService'
import returnHashString from '../util/crypto'

type Credentials = {
  username: string
  password: string
}

enum Role {
  cavernoso = 'cavernoso',
  usuario = 'usuario',
}

const privateKey = process.env.NEXTAUTH_SECRET

const SessionController = {
  async morador(req: Request<Credentials>, res: Response) {
    const { username, password } = req.body

    try {
      const { database } = await connectMongo()
      const repository = new MoradoresRepository(database)
      const moradoresService = new MoradoresService(repository)
      const morador = await moradoresService.showOne(username)

      if (!morador) {
        console.info(`Warning[SERVER](${new Date().toDateString()}): User not found!`)
        throw new Error('User not found!')
      }
      
      if (returnHashString(password) !== morador.senha) {
        console.info(`Warning[SERVER](${new Date().toDateString()}): User incorrect!`)
        throw new Error('User incorrect!')
      }

      if (privateKey === undefined) {
        console.error(`Error[SERVER](${new Date().toDateString()}): Must provide a NEXTAUTH_SECRET env var`)
        throw new Error('Must provide a NEXTAUTH_SECRET env var')
      }

      const jwt_token = jwt.sign(morador, privateKey, {
        expiresIn: 60 * 60 * 24 * 30, // 30 dias
        algorithm: 'HS512'
      })
      
      res.send({
        message: 'Sucesso',
        user: {
          ...morador,
          role: Role.cavernoso,
          token: jwt_token
        }
      })
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong', error})
    }

  }
}

export default SessionController
