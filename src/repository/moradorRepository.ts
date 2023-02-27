import { Db, ObjectId } from 'mongodb'
import Morador from '../models/morador'

export default class MoradoresRepository {
  private _database: Db

  constructor(database: Db) {
    this._database = database;
  }

  public async getAllMoradores(): Promise<Morador[]> {
    const moradores = (await this._database
      .collection("moradores")
      .find({ cachaca_para_tomar: { $exists: true } }) // retira selina dos moradores
      .sort({ cachaca_ja_tomada: -1 }) // ordenas pelos q tomaram mais cachaca
      .toArray()) as any[];

    return moradores;
  }

  public async addCachaca(morador_id: string): Promise<void> {
    // define uma nova cachaca para um morador
    await this._database.collection("moradores").updateOne(
      {
          _id: new ObjectId(morador_id),
      },
      { $inc: { cachaca_para_tomar: 1 } }
    )
  }

  public async updateCachaca(morador_id: string, cachaca_ja_tomada: number, cachaca_para_tomar?: number) {
    await this._database.collection("moradores").updateOne(
      { _id: new ObjectId(morador_id) },
      { $inc: cachaca_para_tomar ? { 
        cachaca_para_tomar: cachaca_para_tomar,
        cachaca_ja_tomada: cachaca_ja_tomada
      } : {
        cachaca_ja_tomada: cachaca_ja_tomada
      }}
    )
  }

  public async getOneMorador(morador_id: string): Promise<Morador> {
    const [morador] = (await this._database
      .collection("moradores")
      .find({ _id: new ObjectId(morador_id) })
      .toArray()) as Morador[];
    return morador;
  }

  public async getMorador(name: string) {
    return await this._database
      .collection('moradores')
      .findOne({ apelido: name }) as Morador
  }

  public async create(morador: Morador) {
    return await this._database
      .collection("moradores")
      .insertOne(morador)
  }

  public async changePassword(name: string, new_password: string) {
    await this._database.collection("moradores")
      .updateOne({ apelido: name }, { $set: { senha: new_password } })
  }
}