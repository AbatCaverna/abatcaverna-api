import UserRepository from '../repository/userRepository'
import getStripe from '../providers/stripe'

type Checkout = {
  price: string,
  quantity: number
}

type CheckoutBody = {
  email: string
  line_items: Array<Checkout>
}

const CheckoutService = {
  async createCheckout({ email, line_items}: CheckoutBody) {
    const userFound = await UserRepository.getUserByEmail(email)
      
    if (!userFound) throw 'User not found'
    
    const stripe = getStripe()

    if (!userFound.stripe_customer_id) {
      const stripeCustomer = await stripe.customers.create({
        name: userFound.name,
        email: userFound.email,
      })

      const updatedUser = await UserRepository.update(email, userFound.name, stripeCustomer.id)

      const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomer.id,
        line_items,
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${process.env.ABAT_WEB_URL}/loja/checkout-sucesso`,
        cancel_url: `${process.env.ABAT_WEB_URL}/loja/checkout-erro`,
      })

      console.log('[SERVER]: Stripe checkout session created for user', updatedUser)
  
      return stripeCheckoutSession.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: userFound.stripe_customer_id,
      line_items,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${process.env.ABAT_WEB_URL}/loja/checkout-sucesso`,
      cancel_url: `${process.env.ABAT_WEB_URL}/loja/checkout-erro`,
    })

    console.log('[SERVER]: Stripe checkout session created for user', userFound)
    return stripeCheckoutSession.id
  }
}

export default CheckoutService
