const igdb = require('../services/igdb')
const cache = require('../services/cache')

const cacheKeyGamePrefix = 'api/market-scores/:igdbGameId:'
const { getGameMarketScores } = require('../../common/igdb')

const { aWeek } = require('../../common/time-periods-in-seconds')

module.exports = {
  friendlyName: 'Market Score',

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
      const cacheKey = `${cacheKeyGamePrefix}${igdbGameId}`
      const gameResults = await cache.wrap(
        cacheKey,
        async () => {
          sails.log.debug('[IGDB-API-CALL]', cacheKey)
          const res = await igdb.games(
            {
              ids: [igdbGameId]
            },
            ['id', 'popularity', 'total_rating', 'first_release_date']
          )
          delete res.headers
          delete res.url
          return res
        },
        { ttl: aWeek }
      )
      if (!gameResults) {
        return exits.error()
      }
      return exits.success(getGameMarketScores(gameResults.body[0], igdbPlatformId))
    } catch (e) {
      return exits.error(e)
    }
  }
}
