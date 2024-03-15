import CachacaRepository from '../repository/cachacaRepository'
import MoradoresRepository from '../repository/moradorRepository'
import Cachaca from '../models/cachaca'


const cachacaService = {
  
  async addMoradorAoRank(ano: number) {
    try {
      const morador = await MoradoresRepository.getAllMoradores_oficiais()

      if (!morador) {
        throw new Error('User not found')
      }
      for (const idMorador of morador) {

        // Verificar se já existe um registro para o morador no ano fornecido
        const existente = await CachacaRepository.verificarRegistroExistente( idMorador._id, ano-1)
        
        if (!idMorador._id) throw new Error('There is no ID')
        
        if (!existente) {

          const toInsert = new Cachaca(
            idMorador._id,
            0,
            0,
            ano,
          )
          await CachacaRepository.addMoradorAoRankCachaca(toInsert)

        } else {
          const toInsert = new Cachaca(
            idMorador._id,
            existente.cachaca_para_tomar,
            0,
            ano,
          )
          await CachacaRepository.addMoradorAoRankCachaca(toInsert)
        }
      }

    } catch (error) {
      throw new Error('Could not create rank')
    }
  },


}

export default cachacaService
