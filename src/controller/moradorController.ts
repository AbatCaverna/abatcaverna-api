import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { z, ZodError } from 'zod'

import moradoresService from '../service/moradorService'

const MoradoresController = {
  async index(req: Request, res: Response) {
    try {
      const { moradorId } = req.query
      const morador = MoradorIdSchema.parse(moradorId)
      const id = moradorId ? new ObjectId(morador) : undefined
      const response = await moradoresService.show(id)

      return res.send({
        message: response ? 'Sucesso' : 'Erro',
        moradores: response
      })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)

      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Bad Request', error })
      }

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
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await moradoresService.deleteOne(id)
      return res.status(204).send()
    } catch (error) {
      if ((error as Error).message) {
        return res.status(400).json({ message: 'Internal Server Error', error: (error as Error).message })
      }

      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const morador = req.body

      const moradorEntity = CreateMoradorSchema.parse({
        ...morador,
        ano_entrada: +morador.ano_entrada,
      })

      const newMorador = await moradoresService.updateOne(id, moradorEntity)

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
  },

}

const CreateMoradorSchema = z.object({
  nome: z.string(),
  apelido: z.string(),
  ano_entrada: z.number(),
  curso: z.string(),
  imagem: z.string(),
  instagram: z.string(),
  oficial:z.boolean(),
  total_cachaca:z.number(),
  formado:z.boolean(),
  calouro:z.boolean(),
})

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

export type MoradorDTO = z.infer<typeof CreateMoradorSchema>

export default MoradoresController
