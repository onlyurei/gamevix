module.exports = {
  attributes: {
    igdbId: {
      type: 'number',
      required: true
    },
    igdbType: {
      type: 'string',
      isIn: ['genres', 'themes'],
      required: true
    },
    slug: {
      type: 'string',
      required: true
    },
    owners: {
      collection: 'user',
      via: 'swapPreferences'
    }
  }
}
