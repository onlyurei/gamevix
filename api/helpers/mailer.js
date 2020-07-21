const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(sails.config.custom.mailer)

module.exports = {
  friendlyName: 'General purpose Mailer for sending emails',

  description: 'Return a personalized greeting based on the provided name.',

  inputs: {
    from: {
      type: 'string',
      description: 'Sender email address',
      required: true
    },
    to: {
      type: 'string',
      description: 'Receiver email address',
      required: true
    },
    subject: {
      type: 'string',
      description: 'Email subject',
      required: true
    },
    html: {
      type: 'string',
      description: 'HTML email body',
      required: true
    },
    text: {
      type: 'string',
      description: 'Plain text email body'
    },
    options: {
      type: 'ref',
      description: 'additional options',
      moreInfoUrl: 'https://nodemailer.com/message/'
    }
  },

  async fn(inputs, exits) {
    const mail = {
      from: inputs.from,
      to: inputs.to,
      subject: inputs.subject,
      html: inputs.html
    }

    if (inputs.text && inputs.text.trim()) {
      mail.text = inputs.text
    }

    Object.assign(mail, inputs.options || {})

    transporter.sendMail(mail, (error, info) => {
      if (error) {
        sails.log.error('[SEND-MAIL-ERROR]', error)
        return exits.error(error)
      }

      sails.log.info('[SEND-MAIL-SUCCESS]', info.messageId)
      return exits.success(info)
    })
  }
}
