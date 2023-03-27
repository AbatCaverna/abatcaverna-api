import { Request, Response } from 'express'
import { Stripe } from 'stripe'
import CheckoutService from '../service/checkoutService'

type Checkout = {
  price: string,
  quantity: number
}

type CheckoutBody = {
  email: string
  line_items: Array<Checkout>
}

const CheckoutController = {
  async index(req: Request, res: Response) {
    const { email, line_items } = req.body as CheckoutBody
    try {
      if (!line_items) return res.status(400).send({ message: 'Must send data with array of line items'})

      const stripeCheckoutSessionId = await CheckoutService.createCheckout({ email, line_items })
      
      return res.status(200).json({ sessionId: stripeCheckoutSessionId })
    } catch (error) {
      console.error(`Error[SERVER](${new Date().toDateString()}): Server error!`, error)

      if ((error as Stripe.errors.StripeError).type === 'StripeInvalidRequestError') {
        const rawError = (error as Stripe.errors.StripeError).raw as Stripe.StripeRawError

        return res.status(rawError.statusCode || 500).json({ message: 'Something went wrong', error: rawError.message })
      }

      if (error === 'User not found') return res.status(404).json({ message: 'Something went wrong', error })

      return res.status(500).json({ message: 'Something went wrong with server', error })
    }
  }
}

export default CheckoutController
