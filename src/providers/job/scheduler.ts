import agenda from './index'

const schedule = {
  completeCheckout: async (data: unknown) => {
    await agenda.schedule('in 1 minute', 'checkout.complete', data)
  }
}

export default schedule
