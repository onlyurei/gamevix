const mailgen = require('../../services/mailgen')
const { origin } = require('../../../common/configs/host')
const { theme } = require('../../../common/configs/vuetify')

async function sendEmailVerification(user) {
  try {
    const email = {
      body: {
        name: user.firstName,
        intro: 'Thanks for being a valued GameVix member.',
        action: {
          instructions:
            'To verify the email used for your GameVix account, ' +
            'please click on the button below:',
          button: {
            color: theme.primary,
            text: 'Verify Email',
            link: `${origin}/member/email-verification?token=${user.emailToken}`
          }
        }
      }
    }

    await sails.helpers.mailer(
      'GameVix <no-reply@gamevix.com>',
      user.email,
      'Verify your email',
      mailgen.generate(email),
      mailgen.generatePlaintext(email),
      { headers: { isTransactional: 'true' } }
    )
  } catch (e) {
    sails.log.error('[SEND-EMAIL-VERIFICATION-ERROR]', e)
  }
}

module.exports = sendEmailVerification
