import agenda from './index'
import { CheckouEmailData } from '../email'

const schedule = {
  completeCheckout: async (data: CheckouEmailData) => {
    await agenda.schedule('in 1 minute', 'send.email.checkout', data)
  }
}

export default schedule
