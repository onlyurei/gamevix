module.exports = {
  friendlyName: 'Set availableForSwap to true for all UserGames',
  inputs: {},
  async fn(inputs, exits) {
    return exits.success(await UserGame.update({}).set({ availableForSwap: true }))
  }
}
