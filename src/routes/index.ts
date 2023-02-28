import { Router } from 'express'

import MoradoresController from '../controller/moradorController'

const route = Router()

route.get('/moradores', MoradoresController.index)
route.put('/moradores/change-password', MoradoresController.changePassword)

export default route
