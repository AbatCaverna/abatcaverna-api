import { Request, Response } from 'express'
import { Readable } from 'stream'
import Stripe from 'stripe'

import scheduler from '../providers/job/scheduler'
import getStripe from '../providers/stripe'
import CheckoutService from '../service/checkoutService'

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  'checkout.session.completed',
])

export const config = {
  api: {
    bodyParser: false
  }
}

const WebhookController = {
  async webhook(req: Request, res: Response) {
    const stripe = getStripe()
    const buff = await buffer(req)
    const secret = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event

    try {

      if (secret && webhookSecret) {
        event = stripe.webhooks.constructEvent(buff, secret, webhookSecret)

      } else {
        return res.status(500).send('error with server keys not found')
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { message } = err as any
      console.log(
        `[SERVER](${new Date().toDateString()}): webhook checkout error`,
        message
      )
      return res.status(400).send(`Webhook error: ${message}`)
    }

    const { type } = event
    if(relevantEvents.has(type)) {
      try {
        switch(type) {
        case 'checkout.session.completed': {
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          console.log(
            `[SERVER](${new Date().toDateString()}): webhook checkout complete`
          )

          if (!checkoutSession.customer_details) throw ('Missing customer data')

          const { name, email } = checkoutSession.customer_details

          const line_items = await stripe.checkout.sessions.listLineItems(checkoutSession.id)

          const products = []
            
          for (const item of line_items.data) {
            let isIngresso = false
            const price_id = item.price?.id || ''
            
            const price = await stripe.prices.retrieve(price_id, {
              expand: ['product']
            })

            const price_amount = price?.unit_amount || 0

            const item_data = {
              price_id: price_id,
              titulo: item.description || '',
              preco: (price_amount / 100).toLocaleString('pt-BR', {
                style: 'currency', 
                currency: 'BRL'
              }),
              isIngresso: false,
              image: ''
            }

            const product = price.product as Stripe.Product

            if (product.metadata.ingresso) {
              console.log(`[SERVER](${new Date().toDateString()}): Trying to buy a ticket, creating pdf file...`)
              isIngresso = true
              item_data.isIngresso = isIngresso
            }
            
            item_data.image = product.images[0] || ''

            products.push(item_data)
          }

          if (!name || !email) {
            return res.status(500).send('Webhook error: $customer not found')
          }

          try {

            const isIngresso = products.filter(p => p.isIngresso).length > 0

            await CheckoutService.checkout(name, email, products)
  
            await scheduler.completeCheckout({ list_items: products, user_name: name, to: email, isIngresso })
          } catch (error) {
            console.log('[SERVER]: Erro handling checkout', error)
            return res.status(500).send(error)
          }

            

          break
        }
        default:
          throw new Error('Unhandled webhook event')
        }
      } catch (error) {
        return res.json({ message: 'Webhook handler failed', error })
      }
    }

    res.status(200).json({ received: true })
  }
}

export default WebhookController
