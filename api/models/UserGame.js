function isNumericArray(array) {
  return !array.some(item => !Number.isInteger(item))
}

module.exports = {
  attributes: {
    igdbId: {
      type: 'number',
      required: true
    },
    slug: {
      type: 'string',
      required: true
    },
    genres: {
      type: 'json',
      custom: isNumericArray
    },
    themes: {
      type: 'json',
      custom: isNumericArray
    },
    availableForSwap: {
      type: 'boolean',
      defaultsTo: false
    },
    platform: {
      model: 'userPlatform'
    },
    owner: {
      model: 'user'
    },
    futureOwner: {
      model: 'user'
    },
    pastOwners: {
      collection: 'user',
      via: 'pastGames'
    },
    swapStatus: {
      model: 'userGameSwap'
    }
  },

  customToJSON() {
    return _.omit(this, ['pastOwners'])
  }
}
