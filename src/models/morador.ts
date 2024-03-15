import { ObjectId } from 'mongodb'

class Morador {
  constructor(
    public nome: string,
    public apelido: string,
    public ano_entrada: number,
    public curso: string,
    public imagem: string,
    public instagram: string,
    public oficial: boolean,
    public total_cachaca: number,
    public formado: boolean,
    public calouro: boolean,
    public senha?: string,
    public _id?: ObjectId,
    public ano_saida?: number
  ) {}
}

export default Morador
