import { Agenda } from '@hokify/agenda'

import emailDefs from './email'

const definitions = [emailDefs]

const allDefs = (agenda: Agenda) => {
  definitions.forEach(def => def(agenda))
}

export default allDefs
