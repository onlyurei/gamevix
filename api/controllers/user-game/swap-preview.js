module.exports = {
  description: 'Swap games preview',

  inputs: {
    include: {
      type: 'string',
      description:
        'comma separated user ids - only include swappable games from these corresponding users'
    },
    exclude: {
      type: 'string',
      description:
        'comma separated user ids - exclude swappable games from these corresponding users'
    }
  },

  async fn(inputs, exits) {
    try {
      exits.success(await sails.helpers.swapGames.with(inputs))
    } catch (e) {
      sails.log.error(e)
      this.res.sendStatus(500)
    }
  }
}
