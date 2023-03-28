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
  },

  async getAllProductsByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params
      const response = await ProdutosService.getAllProducts(email)
      
      return res.send({
        message: 'Sucesso',
        products: response
      })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  },

  async uploadProductFile(req: Request, res: Response) {
    try {
      const file = req.file

      if (!file) throw 'Must send a file'
      
      const link = await ProdutosService.upload(file)
      return res.send({
        message: 'Sucess',
        image_url: link
      })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
    
  },

  async createProduct(req: Request, res: Response) {
    try {
      const { name, value, description, images } = req.body
      const product = await ProdutosService.create(name, value, description, images)
      
      return res.send({
        message: 'Success',
        product: product
      }) 
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)
      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  }
}

export default ProdutosController
