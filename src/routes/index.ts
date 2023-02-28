import { Router } from 'express'

import MoradoresController from '../controller/moradorController'
import validateJWT from '../middleware/validateJWT'

const route = Router()

route.put('/session')

route.get('/moradores', validateJWT, MoradoresController.index)
route.put('/moradores/change-password', MoradoresController.changePassword)

export default route
