module.exports = async function setAdmin(req, res, next) {
  const { user } = req.session.passport || {}
  if (user) {
    const admin = await Admin.findOne({
      userId: typeof user === 'object' ? user.id : user
    })
    if (admin) {
      req.session.passport.admin = true
    }
  }

  return next()
}
