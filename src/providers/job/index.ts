
import { Agenda } from '@hokify/agenda'

import environment from '../../util/environments'
import Handlers from './handlers/email'

if (!environment.mongo_uri) throw 'Missing args, MONGODB_URI'

const agenda = new Agenda({ db: { address: environment.mongo_uri } }) 

// define schedulers
agenda.define('send.email.checkout', Handlers.sendCheckoutEmail)
agenda.define('send.email.user', Handlers.sendNewUserEmail)

agenda.start()

agenda
  .on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda conn error!'))

export default agenda
