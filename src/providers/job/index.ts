import { Agenda } from '@hokify/agenda'

import definitions from './definitions'

if (!process.env.MONGODB_URI) throw 'Missing args, MONGODB_URI'

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI, } }) 

agenda
  .on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda conn error!'))

// define schedulers
definitions(agenda)

export default agenda
