/**
 * Blueprint API Configuration
 * (sails.config.blueprints)
 *
 * For background on the blueprint API in Sails, check out:
 * https://sailsjs.com/docs/reference/blueprint-api
 *
 * For details and more available options, see:
 * https://sailsjs.com/config/blueprints
 *
 */

module.exports.blueprints = {
  /***************************************************************************
   *                                                                          *
   * Automatically expose implicit routes for every action in your app?       *
   *                                                                          *
   ***************************************************************************/

  // actions: false,

  /***************************************************************************
   *                                                                          *
   * Automatically expose RESTful routes for your models?                     *
   *                                                                          *
   ***************************************************************************/

  rest: true,

  /***************************************************************************
   *                                                                          *
   * Automatically expose CRUD "shortcut" routes to GET requests?             *
   * (These are enabled by default in development only.)                      *
   *                                                                          *
   ***************************************************************************/

  shortcuts: false,

  /***************************************************************************
   *                                                                          *
   * Optional mount path prefix for all implicit blueprint routes ("shadows") *
   *                                                                          *
   ***************************************************************************/

  prefix: '/api',

  /***************************************************************************
   *                                                                          *
   * Whether to use plural model names in blueprint routes                    *
   * (e.g. `/users` for the `User` model)                                     *
   *                                                                          *
   ***************************************************************************/

  pluralize: true,

  /***************************************************************************
   *                                                                          *
   * Automatically enroll sockets requesting the `find` blueprint action to   *
   * receive special notifications about any new records for the same model.  *
   * (Only notifies for records created with the `create` blueprint action.)  *
   *                                                                          *
   ***************************************************************************/

  // autoWatch: true,

  /***************************************************************************
   *                                                                          *
   https://github.com/balderdashy/sails-docs/blob/1.0/reference/sails.config/sails.config.blueprints.md#using-parseblueprintoptions
   *                                                                          *
   ***************************************************************************/

  parseBlueprintOptions(req) {
    const queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req)

    if (!req.param('populate', false) && !queryOptions.alias) {
      queryOptions.populates = {}
    }
    return queryOptions
  }
}
