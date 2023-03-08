import MoradoresRepository from 'repository/moradorRepository'
import returnHashString from 'util/crypto'

const MoradoresService = {
  async show() {
    try {
      const moradores = await MoradoresRepository.getAllMoradores()
    
      return moradores
    } catch (error) {
      throw new Error('Erro no servidor')
    }

  },

  async showOne(name: string) {
    try {
      const moradores = await MoradoresRepository.getMorador(name)
    
      return moradores
    } catch (error) {
      throw new Error('Erro no servidor')
    }
  },

  async changePassword(name: string, new_password: string) {
    try {
      const morador = await MoradoresRepository.getMorador(name)
      
      if (!morador) {
        throw new Error('User not found')
      }

      const new_password_hash = returnHashString(new_password)

      await MoradoresRepository.changePassword(name, new_password_hash)
    } catch (error) {
      throw new Error('Could not change password')
    }
  }

}

export default MoradoresService
