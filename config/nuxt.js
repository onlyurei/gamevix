/**
 * nuxt config and init
 */

const { Nuxt, Builder } = require('nuxt')

// Import and set nuxt.js options
const config = require('../nuxt.config')

config.dev = process.env.NODE_ENV === 'development'

const nuxt = new Nuxt(config)

// Start build process (only in development)
if (config.dev) {
  new Builder(nuxt).build()
}

module.exports = { nuxt }
