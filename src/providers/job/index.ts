
import { Agenda } from '@hokify/agenda'
import environment from '../../util/environments'

import definitions from './definitions'

if (!environment.mongo_uri) throw 'Missing args, MONGODB_URI'

const agenda = new Agenda({ db: { address: environment.mongo_uri, } }) 

agenda
  .on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda conn error!'))

// define schedulers
definitions(agenda)

export default agenda
