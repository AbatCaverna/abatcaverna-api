import { ObjectId } from 'mongodb'
import fs from 'fs'

import getStripe from '../providers/stripe'
import getDatabase from '../util/database'
import { ProductsResponse, StripePrice, StripeProduct, ProductResponse } from '../util/types'

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
  },

  async uploadFile(file: Express.Multer.File) {
    const stripe = getStripe()
    const fileData = fs.readFileSync(file.path)

    const upload = await stripe.files.create({
      file: {
        data: fileData,
        name: file.originalname,
        type: 'application.octet-stream'
      },
      purpose: 'dispute_evidence'
    })

    const link = await stripe.fileLinks.create({
      file: upload.id
    })

    return link.url
  },

  async createProduct(name: string, value: number, description?: string, images?: string[]): Promise<ProductResponse> {
    const stripe = getStripe()

    const product_created = await stripe.products.create({
      name,
      description,
      images
    })

    const price = await stripe.prices.create({
      unit_amount: value,
      currency: 'brl',
      product: product_created.id,
    })

    return {
      product: product_created,
      price
    } 
  }
}

export default ProdutosRepository