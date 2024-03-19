import { Request, Response } from 'express'

import cachacaService from '../service/cachacaService'

const CachacaController = {  
  async index(req: Request, res: Response) {
    try {
      const ano = req.body

      const response = await cachacaService.addMoradorAoRank(ano)

      return res.send({
        message: 'Sucesso',
        rank:response
      })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  }
}
export default CachacaController