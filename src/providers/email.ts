/* eslint-disable @typescript-eslint/no-explicit-any */
import sendGrid from '@sendgrid/mail'
import fs from 'fs'
import path from 'path'

import ENVIRONMENT from '../util/environments'

type ListItem =  { titulo: string, preco: string }

export type CheckouEmailData = {
  list_items: ListItem[]
  user_name: string
  to: string | string[]
  isIngresso?: boolean
  fileName?: string
}

const Email = {  
  async sendEmailCheckoutComplete({
    list_items,
    user_name,
    to,
    isIngresso = false
  }: CheckouEmailData) {
    const APP_KEY = ENVIRONMENT.sendgrid

    if (!APP_KEY) throw 'Missing args, SENDGRID_API_KEY'

    let listItem = '<ul>'

    list_items.forEach((item) => {
      listItem += `<li> ${item.titulo} - ${item.preco}</li>`
    })
  
    listItem += '</ul>'

    const html = `
    <html>
    <head>
        <title>Email de compra</title>
    </head>
    <body>
      <h1>Obrigado por comprar na ABatCaverna!</h1>
      Olá ${user_name},
      <br /><br/>
      Você realizou uma compra dos seguintes produtos:
      <br /><br/>
      ${listItem}
      <br /><br/>
      
      <strong>${isIngresso ? 'Fique atento, em breve nós enviaremos seu ingresso para a festa!' : 'Para receber seu produto, entre em contato com algum morador da República!'}</strong>
    </body>
    </html>
    `

    const message: sendGrid.MailDataRequired = {
      from: 'abatcaverna1@gmail.com',
      to: to,
      subject: 'Compra efetuada em ABatCaverna',
      html: html,
      text: `Obrigado por comprar na ABatCaverna!
      Olá ${user_name},
      Você realizou uma compra dos seguintes produtos
      ${listItem}
      Para receber seu produto, entre em contato com algum morador da República!`
    } 

    try {

      sendGrid.setApiKey(APP_KEY)
      await sendGrid.send(message)

      console.log('[SERVER]: Email sent to', to)

    } catch (error) {
      const err = error as any
      console.error('[SERVER]: Error when trying to send email', err.response.body)

    }
  },

  async sendEmailCheckoutCompleteWithAttachment({
    list_items,
    user_name,
    to,
    fileName = ''
  }: CheckouEmailData) {
    const dir = path.resolve(__dirname, fileName)
    console.log('[SERVER]: reading file from', dir)

    let attach: string

    try {
      attach = fs.readFileSync(dir).toString('base64')
      
    } catch (error) {
      throw new Error('Error when trying to open file')
    }
    
    let listItem = '<ul>'

    list_items.forEach((item) => {
      listItem += `<li> ${item.titulo} - ${item.preco}</li>`
    })

    listItem += '</ul>'

    const html = `
    <html>
    <head>
        <title>Email de compra</title>
    </head>
    <body>
      <h1>Obrigado por comprar na ABatCaverna!</h1>
      Olá ${user_name},
      <br /><br/>
      Você realizou uma compra dos seguintes produtos:
      <br /><br/>
      ${listItem}
      <br /><br/>
      Para receber seu produto, entre em contato com algum morador da República!
      Faça download do seu ingresso em anexo!
    </body>
    </html>
    `

    const message: sendGrid.MailDataRequired = {
      from: 'abatcaverna1@gmail.com',
      to: to,
      subject: 'Compra efetuada em ABatCaverna',
      html: html,
      text: `Obrigado por comprar na ABatCaverna!
      Olá ${user_name},
      Você realizou uma compra dos seguintes produtos
      ${listItem}
      Para receber seu produto, entre em contato com algum morador da República!
      Faça download do seu ingresso em anexo!
      `,
      attachments: [
        {
          content: attach,
          filename: 'ingresso.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ]
    } 

    console.log('[SERVER]: trying to send email')
    try {
      const APP_KEY = ENVIRONMENT.sendgrid

      if (!APP_KEY) throw 'Missing args, SENDGRID_API_KEY'

      sendGrid.setApiKey(APP_KEY)
      await sendGrid.send(message)

      console.log('[SERVER]: Email sent to', to)
      
    } catch (error) {
      const err = error as any
      console.error('[SERVER]: Error when trying to send email', err.response.body)

    } finally {
      fs.unlinkSync(dir)
      console.log('[SERVER]: unlink file')
    }
  },

  async sendEmailToNewUser({email, name}: { email: string, name: string}) {
    const APP_KEY = ENVIRONMENT.sendgrid

    if (!APP_KEY) throw 'Missing args, SENDGRID_API_KEY'

    const html = `
    <html>
    <head>
        <title>Email de boas vindas</title>
    </head>
    <body>
      <h1>Olá ${name}! Obrigado por se cadastrar na ABatCaverna!</h1>
    </body>
    </html>
    `

    const message: sendGrid.MailDataRequired = {
      from: 'abatcaverna1@gmail.com',
      to: email,
      subject: 'Bem vindo à ABatCaverna',
      html: html,
      text: `Olá ${name}! Obrigado por se cadastrar na ABatCaverna!`
    } 

    try {
      sendGrid.setApiKey(APP_KEY)
      await sendGrid.send(message)

      console.log('[SERVER]: Email sent to', email)
    } catch (error) {
      const err = error as any
      console.error('[SERVER]: Error when trying to send email', err.response.body)

    }
  }

}

export default Email
