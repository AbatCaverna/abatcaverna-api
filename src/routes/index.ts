import { Router } from 'express'
import fs from 'fs'
import { marked } from 'marked'

import MoradoresController from '../controller/moradorController'
import SessionController from '../controller/sessionController'
import CheckoutController from '../controller/checkoutController'
import ProdutosController from '../controller/produtosController'

import validateJWT from '../middleware/validateJWT'
import upload from '../middleware/upload'
import WebhookController from '../controller/webhookController'

const route = Router()

route.get('/docs', (req, res) => {
  fs.readFile('./DOC.md', (err, data) => {
    if (err) {
      res.send('File not found')
    } else {
      res.send(marked(data.toString()))
    }
  })
})

route.post('/session/morador', SessionController.morador)
route.post('/session/user', SessionController.user)

route.get('/moradores', validateJWT, MoradoresController.index)
route.post('/moradores', validateJWT, upload('imagem'), MoradoresController.create)
route.delete('/moradores/:id', validateJWT, MoradoresController.delete)
route.put('/moradores/:id', validateJWT, MoradoresController.update)

route.put('/moradores/change-password', validateJWT, MoradoresController.changePassword)

route.post('/checkout', validateJWT, CheckoutController.index)

route.get('/produtos', ProdutosController.getAllProducts)
route.get('/produtos/:email', validateJWT, ProdutosController.getAllProductsByEmail)
route.post('/produtos', validateJWT, ProdutosController.createProduct)
route.post('/produtos/upload-file', upload('photo'), ProdutosController.uploadProductFile)

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
