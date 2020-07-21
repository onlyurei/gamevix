/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

const helmet = require('helmet')
const redirectSsl = require('redirect-ssl')
const { nuxt } = require('./nuxt')

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    helmet: helmet(),

    redirectSsl,

    nuxt(req, res) {
      // Build in development
      return nuxt.render(req, res)
    },

    order: [
      'helmet',
      'redirectSsl',
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'router',
      'nuxt',
      'www',
      'favicon'
    ]
  }
}
