const RateLimit = require('express-rate-limit')
const RedisStore = require('rate-limit-redis')
const Redis = require('redis')

const redisConfig = require('../../config/custom').custom.redis

const client = Redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.pass
})

const rateLimit = new RateLimit({
  store: new RedisStore({
    client,
    expiry: 60 * 60 * 12 // limiting time window (seconds)
  }),
  delayAfter: 0, // start to delay responses after this number of requests (0 - disable)
  delayMs: 0, // how long to delay the response (milliseconds) (0 - disable)
  max: 180 // start to block after this number of requests within windowMs
})

module.exports = rateLimit
