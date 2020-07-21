const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis-store')
const mongoStore = require('cache-manager-mongodb')

const redisStoreConfig = sails.config.custom.redis
const database = require('../../database')

const { stringLengthInBytes } = require('../../common/utils')

const memoryCache = cacheManager.caching({
  store: 'memory',
  length: stringLengthInBytes,
  max: 1024 * 1024 * 30, // bytes
  stale: true
})

const redisCache = cacheManager.caching({
  store: redisStore,
  host: redisStoreConfig.host,
  port: redisStoreConfig.port,
  auth_pass: redisStoreConfig.pass
})

const mongoCache = cacheManager.caching({
  store: mongoStore,
  uri: process.env.NODE_ENV === 'production' ? database.prod : database.dev,
  options: {
    collection: 'cache', // prefer Capped https://docs.mongodb.com/manual/core/capped-collections/
    compression: true,
    poolSize: 5,
    autoReconnect: true
  }
})

const cache = cacheManager.multiCaching([memoryCache, redisCache, mongoCache])

module.exports = cache
