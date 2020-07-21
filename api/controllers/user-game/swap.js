module.exports = {
  description: 'Swap games',

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
      const swappedGames = await sails.helpers.swapGames.with(inputs)
      exits.success(
        await Promise.all(
          swappedGames.map(async swappedGame => {
            const { id, futureOwner } = swappedGame
            await sails.helpers.updateGameSwapStatus(id, 'matched')
            return await UserGame.update({ id }, { futureOwner })
          })
        )
      )
    } catch (e) {
      sails.log.error(e)
      this.res.sendStatus(500)
    }
  }
}
