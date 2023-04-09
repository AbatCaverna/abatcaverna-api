import agenda from './index'
import { CheckouEmailData } from '../email'

const schedule = {
  completeCheckout: async (data: CheckouEmailData) => {
    console.log(
      `[SERVER](${new Date().toDateString()}): Scheduler is sending email to ${data.to} in 1 minute`
    )
    await agenda.schedule('in 1 minute', 'send.email.checkout', data)
  },
  newUser: async (email: string, name: string) => {
    console.log(
      `[SERVER](${new Date().toDateString()}): Scheduler is sending email to ${email} now`
    )
    await agenda.now('send.email.user', {email, name})
  }
}

export default schedule
