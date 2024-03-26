import { ObjectId } from 'mongodb'

import Morador from '../models/morador'
import getDatabase from '../util/database'

const MoradoresRepository = {

  async getAllMoradores(id?: ObjectId): Promise<Morador[]> {
    try {
      const _database = await getDatabase()

      const moradores = (await _database
        .collection('moradores')
        .find({
          $and: [
            { cachaca_para_tomar: { $exists: true } },
            { _id: id !== undefined ? id : { $exists: true } }
          ]
        })
        .sort({ cachaca_ja_tomada: -1 })
        .toArray()) as Morador[]

      return moradores
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

  async create(morador: Omit<Morador, '_id'>) {
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

  async updateOne(morador: Partial<Morador>) {
    try {
      const _database = await getDatabase()
      return await _database.collection('moradores')
        .updateOne({ _id: morador._id }, { $set: { ...morador } })
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
  },

  async deleteOne(id: ObjectId) {
    try {
      const _database = await getDatabase()
      const res = await _database.collection('moradores')
        .deleteOne({ _id: id })

      if (res.deletedCount === 0) {
        throw new Error('Nao foi possivel deleter com o id')
      }

      console.log('deleted',)
    } catch (error) {
      throw new Error(`Something wrong with database, ${error}`)
    }
  },

  async getAllMoradores_oficiais(id?: ObjectId): Promise<Morador[]> {
    try {
      const _database = await getDatabase()
        
      const moradores_oficiais = (await _database
        .collection('moradores')
        .find({ oficial: 'true' })
        .toArray()) as Morador[]

      return moradores_oficiais
    } catch (error) {
      throw new Error(`Something wrong with server, ${error}`)
    }
    
  },
  async updateEvolvesVeteran(morador_id:ObjectId) {
    try{
      const _database = await getDatabase()
      await _database
        .collection('moradores')
        .updateOne({ _id: morador_id }, { calouro: false})
    }catch(error){
      throw new Error(`Something wrong with server, ${error}`)
    }
  },
  async upadteNotOfficial(morador_id:ObjectId) {
    try{
      const _database = await getDatabase()
      await _database
        .collection('moradores')
        .updateOne({ _id: morador_id }, { oficial: false})
    }catch(error){
      throw new Error(`Something wrong with server, ${error}`)
    }
  },
  async upadteFormed(morador_id:ObjectId) {
    try{
      const _database = await getDatabase()
      await _database
        .collection('moradores')
        .updateOne({ _id: morador_id }, { formado: true})
    }catch(error){
      throw new Error(`Something wrong with server, ${error}`)
    }
  },
}

export default MoradoresRepository
