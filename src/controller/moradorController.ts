import { Db } from 'mongodb'

import MoradoresService from '../service/moradorService'
import MoradoresRepository from '../repository/moradorRepository'

export default class MoradoresController {
  private moradoresService: MoradoresService;
  
  constructor(db: Db) {
    const repository = new MoradoresRepository(db)
    this.moradoresService = new MoradoresService(repository)
  }
  
  public async index() {

    const response = await this.moradoresService.show();
    
    return {
      message: response ? 'Sucesso' : 'Erro',
      moradores: response
    }
  }

}