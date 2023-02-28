import { Request, Response } from 'express'

import connectMongo from '../providers/mongodb'
import MoradoresRepository from '../repository/moradorRepository'
import MoradoresService from '../service/moradorService'

const MoradoresController = {  
  async index(req: Request, res: Response) {
    const { database } = await connectMongo()
    
    if (database) {
      const repository = new MoradoresRepository(database)
      const moradoresService = new MoradoresService(repository)
      const response = await moradoresService.show();
      
      return res.send({
        message: response ? 'Sucesso' : 'Erro',
        moradores: response
      })
    } else {
      return res.status(500).json({ message: 'Could not connect to database' })
    }
  }

}

export default MoradoresController