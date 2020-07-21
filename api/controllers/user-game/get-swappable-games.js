module.exports = {
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

  async fn(inputs, exists) {
    return exists.success(await sails.helpers.getSwappableGamesForUsers.with(inputs))
  }
}
