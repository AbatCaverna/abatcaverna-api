import { Request, Response } from 'express'
import { z } from 'zod'

import cachacaService from '../service/cachacaService'
import { ObjectId } from 'mongodb'

const CachacaController = {
  async createRank(req: Request, res: Response) {
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
  },
  async index( req: Request, res: Response){
    try {
      const body: ChachacaDTO = AnoSchema.parse(req.body)
      const response = await cachacaService.showRank(body.ano)

      return res.send({
        message: 'Sucesso',
        rank: response
      })
      
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  },
  async addCachaca( req: Request, res: Response){
    try {
      const { moradorId } = req.query
      const morador = MoradorIdSchema.parse(moradorId)
      const id =  new ObjectId(morador) 
      const response =  await cachacaService.addCachacaMorador(id)

      return res.send({
        message: 'Sucesso',
        rank: response
      })
      
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  },  

}

const MoradorIdSchema = z.string().refine((data) => {
  // Check if the data is a string of 12 bytes
  if (/^[0-9a-fA-F]{24}$/.test(data)) {
    return true
  }

  // Check if the data is a string of 24 hex characters
  if (/^[0-9a-fA-F]{24}$/.test(data)) {
    return true
  }

  // Check if the data is an integer
  if (!isNaN(+data) && Number.isInteger(+data)) {
    return true
  }

  return false
}, {
  message: 'Must be a ObjectId. A string of 12 bytes, a string of 24 hex characters, or an integer',
}).optional()

const AnoSchema = z.object({
  ano: z.number().min(2015)
})
type ChachacaDTO = z.infer<typeof AnoSchema>

export default CachacaController
