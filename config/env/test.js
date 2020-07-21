const fixtures = {
  order: ['User', 'Passport'],
  User: require('../../test/fixtures/user.json'),
  Passport: require('../../test/fixtures/passport.json')
}

module.exports = {
  datastores: {
    default: {
      adapter: 'sails-disk',
      inMemoryOnly: true
    }
  },
  session: {
    adapter: ''
  },
  models: {
    datastores: 'disk',
    attributes: {
      id: {
        type: 'string',
        required: true
      }
    }
  },
  log: {
    level: 'error'
  },
  fixtures
}
