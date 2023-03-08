import { ObjectId } from 'mongodb'

import Morador from 'models/morador'
import getDatabase from 'util/database'

const MoradoresRepository = {

  async getAllMoradores(): Promise<Morador[]> {
    try {
      const _database = await getDatabase()

      const moradores = (await _database
        .collection('moradores')
        .find({ cachaca_para_tomar: { $exists: true } }) // retira selina dos moradores
        .sort({ cachaca_ja_tomada: -1 }) // ordenas pelos q tomaram mais cachaca
        .toArray()) as Morador[]

      return moradores
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
    
  },

  async addCachaca(morador_id: string): Promise<void> {
    try {
      const _database = await getDatabase()
      // define uma nova cachaca para um morador
      await _database.collection('moradores').updateOne(
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
      await _database.collection('moradores').updateOne(
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

  async getOneMorador(morador_id: string): Promise<Morador> {
    try {
      const _database = await getDatabase()
      const [morador] = (await _database
        .collection('moradores')
        .find({ _id: new ObjectId(morador_id) })
        .toArray()) as Morador[]
      return morador
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
  },

  async getMorador(name: string) {
    try {
      const _database = await getDatabase()
      return await _database
        .collection('moradores')
        .findOne({ apelido: name }) as Morador
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
    
  },

  async create(morador: Morador) {
    try {
      const _database = await getDatabase()
      return await _database
        .collection('moradores')
        .insertOne(morador)
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
    
  },

  async changePassword(name: string, new_password: string) {
    try {
      const _database = await getDatabase()
      await _database.collection('moradores')
        .updateOne({ apelido: name }, { $set: { senha: new_password } })
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
    
  },
}

export default MoradoresRepository
