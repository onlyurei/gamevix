/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/isLoggedIn.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "isLoggedIn")
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const rateLimit = require('./../api/services/rate-limit')

module.exports.policies = {
  '*': false, // whitelist to be safe since we use blueprint rest
  'address/create': 'hasPassport',
  'address/update': 'isUserItself',
  'address/destroy': 'isUserItself',
  'admin/find': ['setAdmin', 'isAdmin'],
  'market-scores/get': true,
  'model/attributes': true,
  'user/*': ['setAdmin', 'isUserItself'],
  'user/create': true,
  'user/verify-email': true,
  'user/update': ['setAdmin', 'isUserItself', 'safelyUpdateUser'],
  'user/destroy': false,
  'user-game/add': 'isUserItself',
  'user-game/cancel-swaps': ['setAdmin', 'isAdmin'],
  'user-game/get-swappable-games': ['setAdmin', 'isAdmin'],
  'user-game/swap': ['setAdmin', 'isAdmin'],
  'user-game/swap-preview': ['setAdmin', 'isAdmin'],
  'user-platform/add': 'isUserItself',
  'user-swap-preference/add': 'isUserItself',
  'usergame/findOne': ['setAdmin', 'isAdmin'],
  'usergame/find': ['setAdmin', 'isAdmin'],
  'usergame/update': ['isUserItself', 'hasNoFutureOwner'], //TODO truly make sure game belongs to user
  'usergame/destroy': ['isUserItself', 'hasNoFutureOwner'], //TODO truly make sure game belongs to user
  'userplatform/findOne': true,
  'video-games/endpoint': process.env.NODE_ENV === 'production' ? [rateLimit] : true,
  'util/summarize-text': true
}
