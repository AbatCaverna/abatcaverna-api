import { Job } from '@hokify/agenda'

import { CheckouEmailData } from '../../email'

const EmailJobHandler = {
  sendCheckoutEmail: (job: Job<CheckouEmailData>, done: () => void) => {
    const { data } = job.attrs
    console.log('sending checkout email', data)
    done()
  }
}

export default EmailJobHandler
