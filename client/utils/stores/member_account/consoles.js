import platforms from '../../../../common/configs/platforms'

const limit = 50

export const actions = {
  async getOwnedPlatforms({ commit }, { id }) {
    const res = await this.$axios.get(`/users/${id}/platforms?limit=${limit}`)
    commit('SET_OWNED_PLATFORMS', res.data)
  },

  async addOwnedPlatform({ commit }, { id, platform }) {
    const res = await this.$axios.put(`/users/${id}/platforms`, {
      igdbPlatformId: platform.igdbId
    })
    if (res.statusText === 'OK') {
      commit('ADD_OWNED_PLATFORM', res.data)
    }
  },

  async removeOwnedPlatform({ commit, dispatch }, { id, ownedPlatformId }) {
    commit('REMOVE_OWNED_PLATFORM', ownedPlatformId)
    try {
      await this.$axios.delete(`/users/${id}/platforms/${ownedPlatformId}`)
    } catch (e) {
      dispatch('getOwnedPlatforms', { id })
    }
  }
}

export const mutations = {
  SET_OWNED_PLATFORMS(state, ownedPlatforms) {
    state.ownedPlatforms = ownedPlatforms
  },
  ADD_OWNED_PLATFORM(state, platform) {
    state.ownedPlatforms.push(platform)
  },
  REMOVE_OWNED_PLATFORM(state, ownedPlatformId) {
    const index = state.ownedPlatforms.findIndex(
      ownedPlatform => ownedPlatform.id === ownedPlatformId
    )
    if (index >= 0) {
      state.ownedPlatforms.splice(index, 1)
    }
  }
}

export const state = {
  platforms,
  ownedPlatforms: []
}
