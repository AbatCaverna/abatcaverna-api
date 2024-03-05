import MoradoresRepository from '../repository/moradorRepository'
import returnHashString from '../util/crypto'
import {
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import S3 from '../providers/storage'
import fs from 'fs'
import { MoradorDTO } from '../controller/moradorController'
import Morador from '../models/morador'

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

  async uploadImage(file: Express.Multer.File) {
    try {
      const parms = new PutObjectCommand({
        Bucket: 'abatcaverna',
        Key: file.originalname,
        ContentType: file.mimetype,
        ContentLength: file.size,
        Body: file.buffer,
      })
      const response = await S3.send(parms)
      console.log(response)

    } catch (error) {
      throw new Error('Could not upload image')
    }

  },

  async addMorador(morador: MoradorDTO) {
    try {
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
    } catch (error) {
      throw error
    }

  }

}

export default MoradoresService
