import { Router } from 'express'

import MoradoresController from '../controller/moradorController'
import SessionController from '../controller/sessionController'
import CheckoutController from '../controller/checkoutController'
import ProdutosController from '../controller/produtosController'

import validateJWT from '../middleware/validateJWT'
import upload from '../middleware/upload'

const route = Router()

route.post('/session/morador', SessionController.morador)
route.post('/session/user', SessionController.user)

route.get('/moradores', validateJWT, MoradoresController.index)
route.put('/moradores/change-password', MoradoresController.changePassword)

route.post('/checkout', validateJWT, CheckoutController.index)

route.get('/produtos', ProdutosController.getAllProducts)
route.get('/produtos/:email', validateJWT, ProdutosController.getAllProductsByEmail)
route.post('/produtos', validateJWT, ProdutosController.createProduct) 
route.post('/produtos/upload-file', upload, ProdutosController.uploadProductFile)


export default route
