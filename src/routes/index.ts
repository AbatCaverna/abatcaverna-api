import { Router } from 'express'

import MoradoresController from '../controller/moradorController'
import SessionController from '../controller/sessionController'
import validateJWT from '../middleware/validateJWT'

const route = Router()

route.post('/session/morador', SessionController.morador)
route.post('/session/user', SessionController.user)

route.get('/moradores', validateJWT, MoradoresController.index)
route.put('/moradores/change-password', MoradoresController.changePassword)

export default route
