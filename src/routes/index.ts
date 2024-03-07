import { Router } from 'express'

import MoradoresController from '../controller/moradorController'
import SessionController from '../controller/sessionController'
import CheckoutController from '../controller/checkoutController'
import ProdutosController from '../controller/produtosController'

import validateJWT from '../middleware/validateJWT'
import upload from '../middleware/upload'
import WebhookController from '../controller/webhookController'

const route = Router()

route.post('/session/morador', SessionController.morador)
route.post('/session/user', SessionController.user)

route.get('/moradores', validateJWT, MoradoresController.index)
route.put('/moradores/change-password', validateJWT, MoradoresController.changePassword)

route.post('/checkout', validateJWT, CheckoutController.index)

route.get('/produtos', ProdutosController.getAllProducts)
route.get('/produtos/:email', validateJWT, ProdutosController.getAllProductsByEmail)
route.post('/produtos', validateJWT, ProdutosController.createProduct)
route.post('/produtos/upload-file', upload, ProdutosController.uploadProductFile)

route.post('/webhooks', WebhookController.webhook)
route.get('/healthcheck', async (req, res) => {
  const check = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: 'Server Running!'
  }

  try {
    res.send(check)
  } catch (error) {
    check.message = error as any
    res.status(503).send(check)
  }
})

export default route
