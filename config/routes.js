/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const { mapKeys, clone, merge } = require('lodash')
const sailsAuthRoutesClone = clone(require('sails-auth/config/routes').routes)

const authRoutes = mapKeys(sailsAuthRoutesClone, (handler, route) =>
  route.replace(/\//, '/api/')
)

module.exports.routes = merge(
  {
    'GET /api/market-scores': 'market-scores/get',
    'GET /api/models/:model/attributes': 'model/attributes',
    'PATCH /api/users/:id/resend-email-verification': 'user/resend-email-verification',
    'PATCH /api/users/email-verification': 'user/verify-email',
    'PUT /api/users/:id/games': 'user-game/add',
    'PUT /api/users/games/swap/cancel': 'user-game/cancel-swaps',
    'GET /api/users/games/swappable': 'user-game/get-swappable-games',
    'PUT /api/users/games/swap': 'user-game/swap',
    'GET /api/users/games/swap': 'user-game/swap-preview',
    'PUT /api/users/:id/platforms': 'user-platform/add',
    'PUT /api/users/:id/swapPreferences': 'user-swap-preference/add',
    'POST /api/utils/text-summarizer': 'util/summarize-text',
    'GET /api/video-games/:endpoint': 'video-games/endpoint'
    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/
  },
  authRoutes
)
