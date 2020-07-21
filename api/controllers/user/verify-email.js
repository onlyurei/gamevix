module.exports = {
  friendlyName: "Verify user's email",

  inputs: {
    emailToken: {
      type: 'string',
      description: "User's email token"
    }
  },

  async fn(inputs, exists) {
    const { emailToken } = inputs
    try {
      if (!(await User.findOne({ emailToken }))) {
        sails.log.warn('[VERIFY-EMAIL-NOT-FOUND]', { emailToken })
        return this.res.sendStatus(400)
      }
      await User.update({ emailToken }).set({ emailToken: '' })
      sails.log.info('[VERIFY-EMAIL-SUCCESS]', { emailToken })
      return exists.success()
    } catch (error) {
      sails.log.error('[VERIFY-EMAIL-ERROR]', { error, emailToken })
      return this.res.sendStatus(400)
    }
  }
}
