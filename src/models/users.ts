import { ObjectId } from 'mongodb'

export default class User {
  constructor(
    public stripe_customer_id?: string,
    public name?: string,
    public email?: string,
    public image?: string,
    public _id?: ObjectId,
  ) {}
}