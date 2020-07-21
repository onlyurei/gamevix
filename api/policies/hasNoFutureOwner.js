module.exports = async function hasNoFutureOwner(req, res, next) {
  const id = req.param('id') || req.param('childid')
  if (id) {
    const userGame = await UserGame.findOne({ id })
    if (userGame && userGame.futureOwner) {
      return res.forbidden()
    }
  }
  return next()
}
