module.exports = {
  description: 'Return the market score of a given game',

  inputs: {
    igdbGameId: {
      type: 'number',
      required: true
    },
    igdbPlatformId: {
      type: 'number'
    }
  },

  async fn(inputs, exits) {
    const { igdbGameId, igdbPlatformId } = inputs
    try {
      exits.success(await sails.helpers.getGameMarketScores(igdbGameId, igdbPlatformId))
    } catch (e) {
      this.res.sendStatus(404)
    }
  }
}
