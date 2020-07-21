const { dev: url } = require('../../database')

module.exports = {
  datastores: {
    default: {
      adapter: 'sails-mongo',
      url
    }
  }
}
