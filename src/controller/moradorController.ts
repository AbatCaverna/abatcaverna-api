import { Request, Response } from 'express'

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
  }
}

export default MoradoresController