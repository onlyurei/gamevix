const axios = require("axios");

const igdb = require("../../services/igdb");
const cache = require("../../services/cache");

const { apiKey } = sails.config.custom.igdb;

const cacheKeyPrefix = "api/video-games/:endpoint:";
const defaultLimit = require("../../../common/configs/pagination").limit;

const { anHour, aDay, aWeek } = require("../../../common/time-periods-in-seconds");

module.exports = {
  friendlyName: "IGDB Endpoints",

  description: `
  https://github.com/igdb/igdb-api-node
  https://igdb.github.io/api/endpoints/ 
  https://igdb.github.io/api/references/
  `,

  inputs: {
    endpoint: {
      type: "string",
      required: true,
      moreInfoUrl: "https://igdb.github.io/api/endpoints/"
    },
    ids: {
      type: "string",
      description: "JSON string of an array",
      moreInfoUrl: "https://igdb.github.io/api/references/filters/"
    },
    expand: {
      type: "string",
      example: "themes,genres",
      moreInfoUrl: "https://igdb.github.io/api/references/expander/"
    },
    fields: {
      type: "string",
      example: "cover,name",
      moreInfoUrl: "https://igdb.github.io/api/references/fields/"
    },
    filters: {
      type: "string",
      example:
        "{\"release_dates.date-gt\":\"2017-08-31\",\"release_dates.date-lt\":\"2017-09-30\"}",
      description: "JSON string of an object",
      moreInfoUrl: "https://igdb.github.io/api/references/filters/"
    },
    search: {
      type: "string",
      example: "biohazard",
      moreInfoUrl: "https://igdb.github.io/api/references/filters/#text-search"
    },
    order: {
      type: "string",
      example: "release_dates.date:desc",
      moreInfoUrl: "https://igdb.github.io/api/references/ordering/"
    },
    limit: {
      type: "number",
      moreInfoUrl: "https://igdb.github.io/api/references/pagination/"
    },
    offset: {
      type: "number",
      moreInfoUrl: "https://igdb.github.io/api/references/pagination/"
    },
    scroll: {
      type: "number",
      moreInfoUrl: "https://igdb.github.io/api/references/pagination/"
    }
  },

  fn: async function(inputs, exits) {
    const {
      endpoint,
      ids,
      expand,
      fields,
      filters,
      search,
      order,
      limit,
      offset
    } = inputs;
    try {
      const params = {
        fields: (fields && fields.split(",")) || ["id"],
        limit: limit || defaultLimit,
        offset: offset || 0
      };
      if (filters) {
        params.where = filters;
      }
      if (ids) {
        params.where += `& id = ${ids}`;
      }
      if (search) {
        params.search = search;
      }
      if (order) {
        params.sort = order;
      }
      if (expand) {
        params.fields = params.fields.concat(expand.split(","));
      }

      const cacheKey = `${cacheKeyPrefix}${endpoint}${JSON.stringify(params)}`;
      let ttl = aWeek * 2;
      if (endpoint === "games") {
        if (params.filters && filters.indexOf("release_date") > -1) {
          ttl = aDay;
        }
      } else if (endpoint === "pulses") {
        ttl = anHour * 4;
      }
      let cacheHit = true;
      /*const results = await cache.wrap(
        cacheKey,
        async () => {
          cacheHit = false;
          const igdbCall = igdb
            .fields(params.fields)
            .limit(params.limit)
            .offset(params.offset)
            .where(params.where)
            .search(params.search)
            //.sort(params.sort);
          return await (igdbCall.request(`/${endpoint}`)).data;
        },
        { ttl }
      );*/

      cacheHit = false;
      const igdbCall = igdb
        .fields(params.fields)
        .limit(params.limit)
        .offset(params.offset)
        .where(params.where)
        .search(params.search)
      //.sort(params.sort);
      sails.log.debug("[VIDEO-GAMES-ENDPOINT]", { cacheKey, cacheHit });
      //return exits.success(results);
      return exits.success((await igdbCall.request(`/${endpoint}`)).data);
    } catch (e) {
      sails.log.error(e);
      return this.res.sendStatus(503);
    }
  }
};
