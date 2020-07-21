module.exports = function safelyUpdateUser(req, res, next) {
  req.body = _.omit(req.body, User.immutableAttributes)
  return next()
}
