import { Request, Response } from 'express'
import ProdutosService from '../service/produtosService'

const ProdutosController = {
  async getAllProducts(req: Request, res: Response) {
    try {
      const response = await ProdutosService.getAllProducts()
      
      return res.send({
        message: 'Sucesso',
        products: response
      })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  }
}

export default ProdutosController
