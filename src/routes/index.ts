import { Router, Request, Response } from 'express'

import MoradoresController from '../controller/moradorController'
import connectMongo from '../providers/mongodb'

const route = Router()

route.get('/morador', async (req: Request, res: Response) => {
  const { database } = await connectMongo()

  if (database) {
    const moradorController = new MoradoresController(database)
    const data = await moradorController.index()
    res.status(200).send(data)
  } else {
    res.status(500).json({ message: 'Could not connect to database' })

  }
})

export default route
