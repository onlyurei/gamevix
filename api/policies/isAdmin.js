module.exports = function isAdmin(req, res, next) {
  if (req.session.passport && req.session.passport.admin) {
    return next()
  }

  return res.notFound()
}
