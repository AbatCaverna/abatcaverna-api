import { Router } from 'express'

import MoradoresController from '../controller/moradorController'
import SessionController from '../controller/sessionController'
import CheckoutController from '../controller/checkoutController'

import validateJWT from '../middleware/validateJWT'

const route = Router()

route.post('/session/morador', SessionController.morador)
route.post('/session/user', SessionController.user)

route.get('/moradores', validateJWT, MoradoresController.index)
route.put('/moradores/change-password', MoradoresController.changePassword)

route.post('/checkout', validateJWT, CheckoutController.index)

export default route
