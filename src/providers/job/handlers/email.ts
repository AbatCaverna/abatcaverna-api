import { Job } from '@hokify/agenda'

import EmailProvider, { CheckouEmailData } from '../../email'

const EmailJobHandler = {
  sendCheckoutEmail: async (job: Job<CheckouEmailData>, done: () => void) => {
    const { data } = job.attrs
    console.log(
      `[SERVER](${new Date().toDateString()}): Sending email to ${data.to} now`
    )
    try {
      await EmailProvider.sendEmailCheckoutComplete(data)
      done()
    } catch (error) {
      console.log('Error sending emails', error)
    }
    
  },

  sendNewUserEmail: async (job: Job<{ email: string, name: string }>, done: () => void) => {
    const { data } = job.attrs
    console.log('send new user job')
    await EmailProvider.sendEmailToNewUser(data)
    done()
  }
}

export default EmailJobHandler
