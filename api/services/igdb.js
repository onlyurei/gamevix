const igdb = require('igdb-api-node').default

module.exports = igdb(sails.config.custom.igdb.apiKey)
