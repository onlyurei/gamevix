export const mutations = {
  SET_SWAPPABLE_GAMES(state, swappableGames) {
    state.swappableGames = swappableGames
  },
  SET_PENDING_SWAP_GAMES(state, pendingSwapGames) {
    state.pendingSwapGames = pendingSwapGames
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async getSwappableGames({ commit }, { include = [], exclude = [] } = {}) {
    commit('SET_LOADING', true)
    const { data } = await this.$axios.get(
      `/users/games/swappable?include=${include}&exclude=${exclude}`
    )
    commit('SET_SWAPPABLE_GAMES', data)
    commit('SET_LOADING', false)
  },

  async swapGames({ commit, dispatch }, { include = [], exclude = [] } = {}) {
    commit('SET_LOADING', true)
    const { data: gameSwaps } = await this.$axios.put(
      `/users/games/swap?include=${include}&exclude=${exclude}`
    )
    if (gameSwaps.length) {
      dispatch('swapGames')
    } else {
      await dispatch('refresh')
      commit('SET_LOADING', false)
    }
  },

  async getPendingSwapGames({ commit }) {
    const { data } = await this.$axios.get(
      '/usergames?where={"futureOwner":{"!=":null}}&populate=owner,futureOwner,platform'
    )
    commit('SET_PENDING_SWAP_GAMES', data)
  },

  async refresh({ commit, dispatch }) {
    commit('SET_LOADING', true)
    await Promise.all([dispatch('getSwappableGames'), dispatch('getPendingSwapGames')])
    commit('SET_LOADING', false)
  },

  async cancelSwaps({ commit, dispatch }) {
    commit('SET_LOADING', true)
    await this.$axios.put('/users/games/swap/cancel')
    await dispatch('refresh')
    commit('SET_LOADING', false)
  }
}

export const state = () => ({
  swappableGames: [],
  pendingSwapGames: [],
  loading: false
})
