module.exports = async function hasValidAddress(req, res, next) {
  if (req.body) {
    const { availableForSwap } = req.body
    if (availableForSwap) {
      const { user } = req.session.passport || {}
      if (user) {
        const address = await Address.findOne({
          owner: typeof user === 'object' ? user.id : user
        })
        if (address && address.isComplete) {
          return next()
        }
      }
      return res.forbidden()
    }
  }
  return next()
}
