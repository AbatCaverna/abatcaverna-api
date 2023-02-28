import { Router } from 'express'

import MoradoresController from '../controller/moradorController'

const route = Router()

route.get('/moradores', MoradoresController.index)

export default route
