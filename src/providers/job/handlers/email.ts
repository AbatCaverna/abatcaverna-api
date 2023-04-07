import { Job } from '@hokify/agenda'

import EmailProvider, { CheckouEmailData } from '../../email'

const EmailJobHandler = {
  sendCheckoutEmail: async (job: Job<CheckouEmailData>, done: () => void) => {
    const { data } = job.attrs
    console.log('sending checkout email', data)
    try {
      await EmailProvider.sendEmailCheckoutComplete(data)
      done()
    } catch (error) {
      console.log('Error sending emails', error)
    }
    
  }
}

export default EmailJobHandler
