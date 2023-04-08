import Stripe from 'stripe'

import ENVIRONMENT from '../util/environments'

// todo: refatorar para criar um objeto stripe global e retornar ele
function getStripe() {
  const privateKey = ENVIRONMENT.stripe_private_key || ''

  const stripe =  new Stripe(privateKey, {
    apiVersion: '2022-11-15',
  })

  return stripe
}

export default getStripe
