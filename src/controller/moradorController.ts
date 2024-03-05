import { Request, Response } from 'express'
import { z, ZodError } from 'zod'

import moradoresService from '../service/moradorService'

const MoradoresController = {
  async index(req: Request, res: Response) {
    try {
      const response = await moradoresService.show()

      return res.send({
        message: response ? 'Sucesso' : 'Erro',
        moradores: response
      })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  },

  async changePassword(req: Request, res: Response) {
    const { name, new_password } = req.body
    try {
      await moradoresService.changePassword(name, new_password)

      return res.send({
        message: 'Sucesso'
      })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  },

  async create(req: Request, res: Response) {
    try {
      const morador = req.body
      const file = req.file as any
      if (!file) throw new Error('Missing file')

      const moradorEntity = CreateMoradorSchema.parse({
        ...morador,
        ano_entrada: +morador.ano_entrada,
        imagem: file.location,
      })

      const newMorador = await moradoresService.addMorador(moradorEntity)

      return res.json({
        message: 'Sucesso!',
        user: newMorador,
      })
    } catch (error) {

      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Bad Request', error })
      }

      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }
}

const CreateMoradorSchema = z.object({
  nome: z.string(),
  apelido: z.string(),
  ano_entrada: z.number(),
  curso: z.string(),
  imagem: z.string(),
  instagram: z.string(),
})

export type MoradorDTO = z.infer<typeof CreateMoradorSchema>

export default MoradoresController
