import { Job } from '@hokify/agenda'

type CheckouEmailData = {
  email: string
}

const EmailJobHandler = {
  sendCheckoutEmail: (job: Job<CheckouEmailData>, done: () => void) => {
    const { data } = job.attrs
    console.log('sending checkout email', data)
    done()
  }
}

export default EmailJobHandler
