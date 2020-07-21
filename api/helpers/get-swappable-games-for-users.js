const MAX_SWAPPABLE_GAMES_SIZE = 10000

module.exports = {
  friendlyName: 'Get list of swappable games for users',

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
    const query = {
      where: { availableForSwap: true, owner: { '!=': null }, futureOwner: null },
      limit: MAX_SWAPPABLE_GAMES_SIZE
    }
    const { include, exclude } = inputs
    if (typeof include === 'string' && include.trim()) {
      const includes = include.split(',')
      if (includes.length) {
        query.where.owner = query.where.owner || {}
        query.where.owner.in = includes
      }
    }
    if (typeof exclude === 'string' && exclude.trim()) {
      const excludes = exclude.split(',')
      if (excludes.length) {
        query.where.owner = query.where.owner || {}
        query.where.owner.nin = excludes
      }
    }
    const userGames = await UserGame.find(query)
      .populate('platform')
      .populate('owner')
    return exits.success(userGames.filter(userGame => userGame.owner))
  }
}
