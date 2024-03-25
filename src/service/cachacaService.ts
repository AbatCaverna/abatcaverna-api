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
        //verifica se o calouro tomou todas as cachaca para se tornar veterano se nao so na proxima vez que criar 
        if(toInsert.cachaca_para_tomar == 0){
          await MoradoresRepository.updateEvolvesVeteran(toInsert._id)
        }
        await CachacaRepository.addMoradorAoRankCachaca(toInsert)
      }
    }
  },

  async addCachacaMorador(morador_id:ObjectId) {
    await CachacaRepository.addCachaca(morador_id)
  },
  async updateCachacaMorador(morador_id:ObjectId,cachaca_ja_tomada: number, cachaca_para_tomar?: number) {
    await CachacaRepository.updateCachaca(morador_id,cachaca_ja_tomada,cachaca_para_tomar)
  }

}

export default cachacaService
