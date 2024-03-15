import CachacaRepository from '../repository/cachacaRepository'
import returnHashString from '../util/crypto'

const cachacaService = {
  async show() {
    try {
      const moradores = await CachacaRepository.getAllMoradores()
      return moradores
    } catch (error) {
      throw new Error('Erro no servidor')
    }

  },

  async showOne(name: string) {
    try {
      const moradores = await CachacaRepository.getMorador(name)
    
      return moradores
    } catch (error) {
      throw new Error('Erro no servidor')
    }
  },

  async changePassword(name: string, new_password: string) {
    try {
      const morador = await CachacaRepository.getMorador(name)
      
      if (!morador) {
        throw new Error('User not found')
      }

      const new_password_hash = returnHashString(new_password)

      await CachacaRepository.changePassword(name, new_password_hash)
    } catch (error) {
      throw new Error('Could not change password')
    }
  }

}

export default cachacaService
