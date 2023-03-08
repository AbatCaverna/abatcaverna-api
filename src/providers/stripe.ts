import Stripe from 'stripe'

const privateKey = process.env.STRIPE_PRIVATE_KEY || ''

const stripe =  new Stripe(privateKey, {
  apiVersion: '2022-11-15',
})

export default stripe
