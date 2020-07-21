import {
  defaultLimit,
  defaultOffset,
  endpointPrefixes,
  setScrollable
} from '../utils/adapters/igdb'

export const mutations = {
  SET_ENTITIES(state, { entitiesName, entities }) {
    setScrollable(state, entitiesName, entities)
  },
  SET_PULSES(state, pulses) {
    state.pulses = pulses
  }
}

export const state = () => ({
  keywords: {},
  collections: {},
  companies: {},
  franchises: {},
  genres: {},
  platforms: {},
  themes: {},
  pulses: []
})

const fields = 'id,name,slug'
const defaultOrder = 'name:asc'

async function getEntities(
  entitiesName,
  order,
  { commit },
  { limit = defaultLimit, offset = defaultOffset } = {}
) {
  return commit('SET_ENTITIES', {
    entitiesName,
    entities: await this.$axios
      .get(
        `${endpointPrefixes[entitiesName]}?scroll=1&limit=${limit}&offset=${offset}&fields=${fields}&order=${order}`
      )
      .then(res => res.data)
  })
}

export const actions = {
  getKeywords(...args) {
    return getEntities.call(this, 'keywords', defaultOrder, ...args)
  },
  getCollections(...args) {
    return getEntities.call(this, 'collections', defaultOrder, ...args)
  },
  getCompanies(...args) {
    return getEntities.call(this, 'companies', defaultOrder, ...args)
  },
  getFranchises(...args) {
    return getEntities.call(this, 'franchises', defaultOrder, ...args)
  },
  getGenres(...args) {
    return getEntities.call(this, 'genres', defaultOrder, ...args)
  },
  getPlatforms(...args) {
    return getEntities.call(this, 'platforms', 'generation:desc,name:asc', ...args)
  },
  getThemes(...args) {
    return getEntities.call(this, 'themes', defaultOrder, ...args)
  },
  async getPulses({ commit }) {
    try {
      const { data } = await this.$axios.get(
        `${endpointPrefixes.pulses}?fields=title,summary,url,author,published_at,updated_at,image&order=published_at:desc&limit=240`
      )
      if (data && data.length) {
        commit('SET_PULSES', data.filter(pulse => pulse.title && pulse.url))
      }
    } catch (e) {
      //
    }
  }
}
