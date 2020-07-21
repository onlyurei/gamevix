/**
 * isUserItself
 *
 * A simple policy that checks if the user is the requesting a user resource of its own
 *
 * For more about how this policy works and how to use it, see:
 * https://next.sailsjs.com/documentation/concepts/policies
 */
module.exports = function hasPassport(req, res, next) {
  const { user } = req.session.passport || {}
  if (user) {
    const id = req.param('owner') || req.param('parentid') || req.param('id')
    if (
      id === user.id ||
      id === user ||
      (req.session.passport && req.session.passport.admin)
    ) {
      return next()
    }
  }

  return res.notFound()
}
