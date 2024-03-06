import { ObjectId } from 'mongodb'

import { MoradorDTO } from '../controller/moradorController'
import Morador from '../models/morador'
import returnHashString from '../util/crypto'
import MoradoresRepository from '../repository/moradorRepository'

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
  },

  async addMorador(morador: MoradorDTO) {
    const toInsert = new Morador(
      morador.nome,
      morador.apelido,
      morador.ano_entrada,
      morador.curso,
      morador.imagem,
      morador.instagram,
      0,
      0,
      returnHashString('123456')
    )

    const inserted = await MoradoresRepository.create(toInsert)
    return inserted

  },

  async updateOne(id: string, morador: MoradorDTO) {
    const oldMorador = await MoradoresRepository.getOneMorador(id)
    const newMorador = new Morador(
      morador.nome,
      morador.apelido,
      morador.ano_entrada,
      morador.curso,
      morador.imagem,
      morador.instagram,
      // coisas que nao podem ser atualizadas por aqui
      oldMorador.cachaca_para_tomar,
      oldMorador.cachaca_ja_tomada,
      oldMorador.senha,
      oldMorador._id,
    )

    const inserted = await MoradoresRepository.updateOne(newMorador)
    return inserted

  },

  async deleteOne(id: string) {
    return MoradoresRepository.deleteOne(new ObjectId(id))
  }

}

export default MoradoresService
