const igdb = require('../../services/igdb')
const cache = require('../../services/cache')

const cacheKeyPlatformPrefix = 'api/platforms/:igdbPlatformId:'

const { aYear } = require('../../../common/time-periods-in-seconds')

module.exports = {
  friendlyName: 'Add a platform to the user',

  inputs: {
    id: {
      type: 'string',
      required: true
    },
    igdbPlatformId: {
      type: 'number',
      required: true
    }
  },

  fn: async function(inputs, exits) {
    try {
      const cacheKey = `${cacheKeyPlatformPrefix}${inputs.igdbPlatformId}`
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

      const igdbPlatform = platformResults.body[0]

      const platform = {
        igdbId: igdbPlatform.id,
        slug: igdbPlatform.slug
      }
      const userPlatform = await UserPlatform.findOrCreate(platform, platform)

      await User.addToCollection(inputs.id, 'platforms', userPlatform.id)
      return exits.success(userPlatform)
    } catch (e) {
      sails.log.error(e.message, e.stack)
      return this.res.sendStatus(400)
    }
  }
}
