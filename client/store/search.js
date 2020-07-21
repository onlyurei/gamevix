import {
  defaultGameFields,
  endpointPrefixes,
  setScrollable
} from '../utils/adapters/igdb'

const endpointPrefix = `${endpointPrefixes.games}?`

export const mutations = {
  SET_QUERY(state, query) {
    state.query = query
  },
  SET_SEARCH_RESULTS(state, games) {
    setScrollable(state, 'searchResults', games)
  }
}

export const state = () => ({
  query: '',
  searchResults: {}
})

export const actions = {
  async query({ commit }, { offset = 0, search }) {
    try {
      commit(
        'SET_SEARCH_RESULTS',
        await this.$axios
          .get(
            `${endpointPrefix}search=${search}&offset=${offset}&fields=${defaultGameFields}`
          )
          .then(res => res.data)
      )
    } catch (e) {
      commit('SET_SEARCH_RESULTS', {})
    }
  }
}
