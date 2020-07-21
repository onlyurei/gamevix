module.exports = {
  friendlyName: 'Remove futureOwner from all UserGames',
  inputs: {},
  async fn(inputs, exits) {
    await UserGameSwap.update({}).set({ status: 'waitingForMatch' })
    return exits.success(await UserGame.update({}).set({ futureOwner: null }))
  }
}
