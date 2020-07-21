/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /**************************************************************************
   *                                                                          *
   * Default settings for custom configuration used in your app.              *
   * (these may also be overridden in config/env/production.js)               *
   *                                                                          *
   ***************************************************************************/
  igdb: {
    apiKey: 'obfuscated'
  },
  mailer: {
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false,
    auth: {
      user: 'obfuscated',
      pass: 'obfuscated'
    },
    logger: false,
    debug: false
  },
  redis: {
    host: 'obfuscated',
    port: 16508,
    pass: 'obfuscated'
  },
  shippo: {
    apiKey: 'obfuscated'
  }
}
