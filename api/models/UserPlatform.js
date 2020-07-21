const platformsWhitelist = require('../../common/configs/platforms.json')

function isInPlatformWhitelist(key, value) {
  return !!platformsWhitelist.find(platform => platform[key] === value)
}

module.exports = {
  attributes: {
    igdbId: {
      type: 'number',
      required: true,
      custom: value => {
        return isInPlatformWhitelist('igdbId', value)
      }
    },
    slug: {
      type: 'string',
      required: true,
      custom: value => {
        return isInPlatformWhitelist('slug', value)
      }
    },
    games: {
      collection: 'userGame',
      via: 'platform'
    },
    owners: {
      collection: 'user',
      via: 'platforms'
    }
  }
}
