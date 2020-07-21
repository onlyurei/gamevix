const uuid = require('uuid/v4')
const sendEmailVerification = require('../../emails/transactional/email-verification')

module.exports = {
  friendlyName: 'Resend email verification',

  inputs: {
    id: {
      type: 'string',
      description: "User's id"
    }
  },

  async fn(inputs, exists) {
    const { id } = inputs
    try {
      const user = await User.findOne({ id })
      if (!user) {
        sails.log.warn('[RESEND-EMAIL-VERIFICATION-NOT-FOUND]', { id })
        return this.res.sendStatus(400)
      }
      if (user.emailToken === '') {
        sails.log.warn('[RESEND-EMAIL-VERIFICATION-ALREADY-VERIFIED]', { id })
        return this.res.sendStatus(400)
      } else if (!user.emailToken) {
        sails.log.info('[RESEND-EMAIL-VERIFICATION-GENERATE-TOKEN]', { id })
        user.emailToken = uuid()
        await User.update({ id }).set({ emailToken: user.emailToken })
      }
      await sendEmailVerification(user)
      sails.log.info('[RESEND-EMAIL-VERIFICATION-SUCCESS]', { id })
      return exists.success()
    } catch (error) {
      sails.log.error('[RESEND-EMAIL-VERIFICATION-ERROR]', { error, id })
      return this.res.sendStatus(400)
    }
  }
}
