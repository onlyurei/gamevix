const igdb = require('../../services/igdb')
const cache = require('../../services/cache')

const cacheKeyGamePrefix = 'api/games/:igdbGameId:'
const cacheKeyPlatformPrefix = 'api/platforms/:igdbPlatformId:'

const { aYear } = require('../../../common/time-periods-in-seconds')

module.exports = {
  friendlyName: 'Add a game to the user',

  inputs: {
    id: {
      type: 'string',
      required: true
    },
    igdbGameId: {
      type: 'number',
      required: true
    },
    igdbPlatformId: {
      type: 'number',
      required: true
    }
  },

  fn: async function(inputs, exits) {
    try {
      let cacheKey = `${cacheKeyGamePrefix}${inputs.igdbGameId}`
      const gameResults = await cache.wrap(
        cacheKey,
        async () => {
          sails.log.debug('[IGDB-API-CALL]', cacheKey)
          const res = await igdb.games(
            {
              ids: [inputs.igdbGameId]
            },
            ['id', 'slug', 'name', 'genres', 'themes', 'release_dates']
          )
          delete res.headers
          delete res.url
          return res
        },
        { ttl: aYear }
      )
      if (!gameResults) {
        return this.res.sendStatus(400)
      }

      cacheKey = `${cacheKeyPlatformPrefix}${inputs.igdbPlatformId}`
      const platformResults = await cache.wrap(
        cacheKey,
        async () => {
          sails.log.debug('[IGDB-API-CALL]', cacheKey)
          const res = await igdb.platforms(
            {
              ids: [inputs.igdbPlatformId]
            },
            ['id', 'slug', 'name']
          )
          delete res.headers
          delete res.url
          return res
        },
        { ttl: aYear }
      )
      if (!platformResults) {
        return this.res.sendStatus(400)
      }

      const igdbGame = gameResults.body[0]
      const igdbPlatform = platformResults.body[0]

      if (
        igdbGame.release_dates &&
        igdbGame.release_dates.length &&
        !igdbGame.release_dates.find(
          release_date => release_date.platform === igdbPlatform.id
        )
      ) {
        return this.res.sendStatus(400)
      }
      //verified game and platform in igdb

      const platform = {
        igdbId: igdbPlatform.id,
        slug: igdbPlatform.slug
      }
      const userPlatform = await UserPlatform.findOrCreate(platform, platform)
      //verified platform in whitelist via model attributes (id, slug) custom validations

      const game = {
        owner: inputs.id,
        igdbId: igdbGame.id,
        slug: igdbGame.slug,
        genres: igdbGame.genres,
        themes: igdbGame.themes,
        platform: userPlatform.id
      }
      const userGame = await UserGame.findOrCreate(game, game)

      const gameSwap = {
        owner: userGame.id,
        status: 'waitingForMatch'
      }
      const userGameSwap = await UserGameSwap.findOrCreate(gameSwap, gameSwap)
      await UserGame.update({ id: userGame.id }, { swapStatus: userGameSwap.id })

      await User.addToCollection(inputs.id, 'platforms', userPlatform.id)
      await User.addToCollection(inputs.id, 'games', userGame.id)
      return exits.success(userGame)
    } catch (e) {
      sails.log.error(e.message, e.stack)
      return this.res.sendStatus(400)
    }
  }
}
