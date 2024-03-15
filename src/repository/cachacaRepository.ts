import { ObjectId } from 'mongodb'
import Cachaca from '../models/cachaca'
import getDatabase from '../util/database'

const CachacaRepository = {
  async verificarRegistroExistente(morador_id:(ObjectId | undefined), ano:number){
    try{
      const database = await getDatabase()
      const verify = await database
        .collection('cachaca')
        .findOne({
          $and:[
            { _id: morador_id !== undefined ? morador_id : { $exists: true } },
            { ano_do_rank:  ano }, 
          ]
        }) as Cachaca
      return verify
    }catch(error){
      throw new Error(`Something wrong with server, ${error}`)
    }
  },

  async addCachaca(morador_id: string): Promise<void> {
    try {
      const _database = await getDatabase()
      // define uma nova cachaca para um morador
      await _database.collection('cachaca').updateOne(
        {
          _id: new ObjectId(morador_id),
        },
        { $inc: { cachaca_para_tomar: 1 } }
      )
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
    
  },

  async updateCachaca(morador_id: string, cachaca_ja_tomada: number, cachaca_para_tomar?: number) {
    try {
      const _database = await getDatabase()
      await _database.collection('cachaca').updateOne(
        { _id: new ObjectId(morador_id) },
        { $inc: cachaca_para_tomar ? { 
          cachaca_para_tomar: cachaca_para_tomar,
          cachaca_ja_tomada: cachaca_ja_tomada
        } : {
          cachaca_ja_tomada: cachaca_ja_tomada
        }}
      )
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
  },

  async addMoradorAoRankCachaca(morador: Omit<Cachaca, '_id'>) {
    try {
      const _database = await getDatabase()
      return await _database
        .collection('cachaca')
        .insertOne(morador)
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
  },

}

export default CachacaRepository
