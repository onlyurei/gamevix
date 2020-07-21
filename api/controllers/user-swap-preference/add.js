const igdb = require('../../services/igdb')
const cache = require('../../services/cache')

const cacheKeyGenrePrefix = 'api/genres/:igdbGenreId:'
const cacheKeyThemePrefix = 'api/themes/:igdbThemeId:'

const igdbTypeToEndpointMapping = {
  genres: cacheKeyGenrePrefix,
  themes: cacheKeyThemePrefix
}

const { aYear } = require('../../../common/time-periods-in-seconds')

module.exports = {
  friendlyName: 'Add a swap preference (genre or theme) to user',

  inputs: {
    id: {
      type: 'string',
      required: true
    },
    igdbId: {
      type: 'number',
      required: true
    },
    igdbType: {
      type: 'string',
      enum: ['genres', 'themes'],
      required: true
    }
  },

  fn: async function(inputs, exits) {
    try {
      const cacheKey = `${igdbTypeToEndpointMapping[inputs.igdbType]}${inputs.igdbId}`
      const igdbItemResult = await cache.wrap(
        cacheKey,
        async () => {
          sails.log.debug('[IGDB-API-CALL]', cacheKey)
          const res = await igdb[inputs.igdbType](
            {
              ids: [inputs.igdbId]
            },
            ['id', 'slug']
          )
          delete res.headers
          delete res.url
          return res
        },
        { ttl: aYear }
      )
      if (!igdbItemResult) {
        return this.res.sendStatus(400)
      }

      const igdbItem = igdbItemResult.body[0]

      const swapPreference = {
        igdbId: igdbItem.id,
        slug: igdbItem.slug,
        igdbType: inputs.igdbType
      }
      const userSwapPreference = await UserSwapPreference.findOrCreate(
        swapPreference,
        swapPreference
      )

      await User.addToCollection(inputs.id, 'swapPreferences', userSwapPreference.id)
      return exits.success(userSwapPreference)
    } catch (e) {
      sails.log.error(e.message, e.stack)
      return this.res.sendStatus(400)
    }
  }
}
