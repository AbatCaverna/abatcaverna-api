import getDatabase from '../util/database'

type Product = {
  price_id: string
  titulo: string
  preco: string
  isIngresso: boolean
  image: string
}

const UserOrdersRepository = {
  async create(email: string, products: Product[]) {
    const database = await getDatabase()
    
    await database.collection('user_orders').insertOne({
      user_email: email,
      products: products
    })
  }
}

export default UserOrdersRepository
