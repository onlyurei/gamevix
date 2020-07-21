module.exports = {
  inputs: {},
  async fn(inputs, exits) {
    exits.success(await sails.helpers.cancelGamesSwap())
  }
}
