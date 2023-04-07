import Stripe from 'stripe'

import ENVIRONMENT from '../util/environments'

function getStripe() {
  const privateKey = ENVIRONMENT.stripe_private_key || ''

  const stripe =  new Stripe(privateKey, {
    apiVersion: '2022-11-15',
  })

  return stripe
}

export default getStripe
