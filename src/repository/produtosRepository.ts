import { ObjectId } from 'mongodb'

import getStripe from '../providers/stripe'
import getDatabase from '../util/database'
import { ProductsResponse, StripePrice, StripeProduct } from '../util/types'

type Product = {
  price_id: string
  titulo: string
  preco: string
  isIngresso: boolean
}

type Orders = {
  _id: ObjectId
  user_email: string,
  products: Array<Product>
}

const ProdutosRepository = {
  async getAll(email?: string): Promise<ProductsResponse> {
    const stripe = getStripe()
    const database = await getDatabase()

    const prices = await stripe.prices.list({
      limit: 10,
    })

    let ja_comprou_ingresso = false

    if (email !== undefined) {
      const [compra] = (await database
        .collection('user_orders')
        .find({ user_email: email })
        .toArray()) as Orders[]

  
      if (compra) {
        for (const produto of compra.products) {
          if(produto.isIngresso) {
            ja_comprou_ingresso = true
          }
        }
      } 
      
    }

    const products = []

    for (const price of prices.data) {
      const product = await stripe.products.retrieve(
        price.product.toString()
      )

      if (price.active && product.active && !(ja_comprou_ingresso && product.metadata.ingresso)) {
        products.push({
          product: (product as StripeProduct),
          price: (price as StripePrice)
        })
      }

    }

    return products
  }
}

export default ProdutosRepository