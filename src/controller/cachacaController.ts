import { Request, Response } from 'express'
import { z } from 'zod'

import cachacaService from '../service/cachacaService'

const CachacaController = {
  async index(req: Request, res: Response) {
    try {
      const body: ChachacaDTO = AnoSchema.parse(req.body)

      const response = await cachacaService.addMoradorAoRank(body.ano)

      return res.send({
        message: 'Sucesso',
        rank: response
      })

    } catch (error) {

      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)

      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  }
}

const AnoSchema = z.object({
  ano: z.number().min(2015)
})
type ChachacaDTO = z.infer<typeof AnoSchema>

export default CachacaController
