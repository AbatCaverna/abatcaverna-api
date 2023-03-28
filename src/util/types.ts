import Stripe from 'stripe'

export type StripePrice = Stripe.Response<Stripe.Price>

export type StripeProduct = Stripe.Response<Stripe.Product>

export type ProductResponse = {
  product: StripeProduct
  price: StripePrice
}

export type ProductsResponse = ProductResponse[]

export enum Role {
  cavernoso = 'cavernoso',
  usuario = 'usuario',
}