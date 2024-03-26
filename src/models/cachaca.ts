import { ObjectId } from 'mongodb'

class Cachaca {
  constructor(
    public morador_id : ObjectId,
    public cachaca_para_tomar: number,
    public cachaca_ja_tomada: number,
    public ano_do_rank:number,
    public _id?: ObjectId,
  ) {}
}

export default Cachaca
