import { Agenda } from '@hokify/agenda'
import Handlers from '../handlers/email'

const emailDefinitions = (agenda: Agenda) => {
  agenda.define('send.email.checkout', Handlers.sendCheckoutEmail)
  agenda.define('send.email.user', Handlers.sendNewUserEmail)
}

export default emailDefinitions
