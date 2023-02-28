import MoradoresRepository from '../repository/moradorRepository'
import returnHashString from '../util/crypto'

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

  public async showOne(name: string) {
    try {
      const moradores = await this._moradorRepository.getMorador(name)
    
      return moradores
    } catch (error) {
      throw new Error('Erro no servidor')
    }
  }

  public async changePassword(name: string, new_password: string) {
    try {
      const morador = await this._moradorRepository.getMorador(name)
      
      if (!morador) {
        throw new Error('User not found')
      }

      const new_password_hash = returnHashString(new_password)

      await this._moradorRepository.changePassword(name, new_password_hash)
    } catch (error) {
      throw new Error('Could not change password')
    }
  }

}