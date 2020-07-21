/**
 * hasPassport
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how this policy works and how to use it, see:
 * https://next.sailsjs.com/documentation/concepts/policies
 */
module.exports = function hasPassport(req, res, next) {
  // If `req.session.passport` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  if (req.session.passport) {
    return next()
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.forbidden()
}
