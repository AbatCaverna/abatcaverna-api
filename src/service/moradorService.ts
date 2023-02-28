import MoradoresRepository from '../repository/moradorRepository'

export default class MoradoresService {

  private _moradorRepository: MoradoresRepository

  constructor(moradorRepository: MoradoresRepository) {
    this._moradorRepository = moradorRepository
  }

  public async show() {
    try {
      const moradores = await this._moradorRepository.getAllMoradores()
    
      return moradores
    } catch (error) {
      throw new Error('Erro no servidor')
    }

  }

}