import { Agenda } from '@hokify/agenda'
import Handlers from '../handlers/email'

const emailDefinitions = (agenda: Agenda) => {
  agenda.define('send.email.checkout', Handlers.sendCheckoutEmail)
}

export default emailDefinitions
