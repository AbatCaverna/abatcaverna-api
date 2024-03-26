import CachacaRepository from '../repository/cachacaRepository'
import MoradoresRepository from '../repository/moradorRepository'
import Cachaca from '../models/cachaca'
import { ObjectId } from 'mongodb'


const cachacaService = {
  
  async addMoradorAoRank(ano: number) {
 
    const morador = await MoradoresRepository.getAllMoradores_oficiais()
    if (!morador) {
      throw new Error('User not found')
    }

    for (const idMorador of morador) {

      if (!idMorador._id) throw new Error('There is no ID')

      // Verificar se já existe um registro para o morador no ano fornecido
      const existente = await CachacaRepository.verificaRegistroExistente( idMorador._id, ano -1)

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
          ano
        )
        await CachacaRepository.addMoradorAoRankCachaca(toInsert)
      }
    }
  },

  async verifyVeterano(ano: number){
    const morador = await MoradoresRepository.getAllMoradores_oficiais()
    if (!morador) {
      throw new Error('User not found')
    }
    // Verificar se já existe um registro para o morador no ano fornecido
    for (const idMorador of morador) {
      const existente = await CachacaRepository.verificaRegistroExistente( idMorador._id, ano -1)
      if(existente){
        await MoradoresRepository.updateEvolvesVeteran(existente.morador_id)
      }
    }
  },
  
  async addCachacaMorador(morador_id:ObjectId) {
    await CachacaRepository.addCachaca(morador_id)

  },
  async updateCachacaMorador(morador_id:ObjectId,cachaca_ja_tomada: number, cachaca_para_tomar?: number) {
    await CachacaRepository.updateCachaca(morador_id,cachaca_ja_tomada,cachaca_para_tomar)
  },
  async showRank(ano: number) {
    const rank = await CachacaRepository.showRankMoradores(ano)
    return rank
  },



}

export default cachacaService
