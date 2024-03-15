import { ObjectId } from 'mongodb'

class Cachaca {
  constructor(
    public _id: ObjectId,
    public cachaca_para_tomar: number,
    public cachaca_ja_tomada: number,
    public ano_do_rank:number,
  ) {}
}

export default Cachaca
