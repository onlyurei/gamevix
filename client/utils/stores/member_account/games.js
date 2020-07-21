import { difference, uniqBy } from 'lodash'

import { endpointPrefixes } from '../../adapters/igdb'

const fields = 'id,name,slug'
const order = 'name:asc'
const limit = 50

function generateEntitiesEndpointUrl(entitiesName) {
  return `${endpointPrefixes[entitiesName]}?limit=${limit}&offset=0&fields=${fields}&order=${order}`
}

function generateEntitiesPreference(entity, entitiesName) {
  return {
    igdbId: entity.id,
    igdbType: entitiesName,
    slug: entity.slug,
    name: entity.name
  }
}

export const actions = {
  async getGenres({ commit }) {
    const res = await this.$axios.get(generateEntitiesEndpointUrl('genres'))
    commit('SET_GENRES', res.data)
  },

  async getThemes({ commit }) {
    const res = await this.$axios.get(generateEntitiesEndpointUrl('themes'))
    commit('SET_THEMES', res.data)
  },

  async getSwapPreferences({ commit }, { id }) {
    const res = await this.$axios.get(`/users/${id}/swapPreferences?limit=${limit}`)
    commit('SET_SWAP_PREFERENCES', res.data)
  },

  async addSwapPreference({ commit }, { id, igdbId, igdbType }) {
    const res = await this.$axios.put(`/users/${id}/swapPreferences`, {
      igdbId,
      igdbType
    })
    if (res.statusText === 'OK') {
      commit('ADD_SWAP_PREFERENCE', res.data)
    }
  },

  async removeSwapPreferences({ commit, dispatch }, { id, swapPreferenceId }) {
    commit('REMOVE_SWAP_PREFERENCE', swapPreferenceId)
    try {
      this.$axios.delete(`/users/${id}/swapPreferences/${swapPreferenceId}`)
    } catch (e) {
      dispatch('getSwapPreferences', { id })
    }
  },

  async updateSwapPreferences({ dispatch, state }, { id, swapPreferences }) {
    const swapPreferenceUniqBy = swapPreference =>
      `${swapPreference.igdbId}${swapPreference.igdbType}`
    const removedPreferences = uniqBy(
      difference(state.swapPreferences, swapPreferences),
      swapPreferenceUniqBy
    )
    removedPreferences.forEach(removedPreference =>
      dispatch('removeSwapPreferences', {
        id,
        swapPreferenceId: removedPreference.id
      })
    )
    const addedPreferences = uniqBy(
      difference(swapPreferences, state.swapPreferences),
      swapPreferenceUniqBy
    )
    addedPreferences.forEach(addedPreference =>
      dispatch('addSwapPreference', {
        id,
        igdbId: addedPreference.igdbId,
        igdbType: addedPreference.igdbType
      })
    )
  },

  async getGames({ commit }, { id }) {
    const sort = JSON.stringify([{ platform: 'ASC' }, { slug: 'ASC' }])
    const games = await this.$axios.get(`/users/${id}/games?sort=${sort}&limit=500`)
    const platformIds = [...new Set(games.data.map(game => game.platform))]
    const userPlatforms = await Promise.all(
      platformIds.map(platformId => this.$axios.get(`/userplatforms/${platformId}`))
    )
    games.data.forEach(game => {
      const populatedPlatform = userPlatforms.find(
        platform => platform && platform.data && platform.data.id === game.platform
      )
      if (populatedPlatform) {
        game.platform = populatedPlatform.data
      }
    })
    const igdbGameIds = [...new Set(games.data.map(game => game.igdbId))]
    const igdbGames = await this.$axios.get(
      `/video-games/games?ids=${JSON.stringify(igdbGameIds)}&fields=cover,name`
    )
    games.data.forEach(game => {
      const igdbGame = igdbGames.data.find(_igdbGame => _igdbGame.id === game.igdbId)
      if (igdbGame) {
        const { id, ...rest } = igdbGame // eslint-disable-line no-shadow
        Object.assign(game, rest)
      }
    })
    commit('SET_GAMES', games.data)
  },

  async addGame({ dispatch }, { id, igdbGameId, igdbPlatformId }) {
    const res = await this.$axios.put(`/users/${id}/games`, {
      igdbGameId,
      igdbPlatformId
    })
    if (res.statusText === 'OK') {
      dispatch('getGames', { id })
    }
  },

  async removeGame({ commit, dispatch }, { id, gameId }) {
    commit('REMOVE_GAME', gameId)
    try {
      await this.$axios.delete(`/usergames/${gameId}?owner=${id}`)
    } catch (e) {
      dispatch('getGames', { id })
    }
  },

  async toggleGameAvailableForSwap({ commit }, { id, game }) {
    const availableForSwap = !game.availableForSwap
    const res = await this.$axios.patch(`/usergames/${game.id}`, {
      owner: id,
      availableForSwap
    })
    if (res.statusText === 'OK') {
      commit('UPDATE_GAME', { ...game, availableForSwap })
    }
  }
}

export const mutations = {
  SET_GENRES(state, genres) {
    state.genres = genres
  },
  SET_THEMES(state, themes) {
    state.themes = themes
  },
  SET_SWAP_PREFERENCES(state, swapPreferences) {
    state.swapPreferences = swapPreferences
  },
  ADD_SWAP_PREFERENCE(state, swapPreference) {
    state.swapPreferences.push(swapPreference)
  },
  REMOVE_SWAP_PREFERENCE(state, swapPreferenceId) {
    const index = state.swapPreferences.findIndex(
      swapPreference => swapPreference.id === swapPreferenceId
    )
    if (index >= 0) {
      state.swapPreferences.splice(index, 1)
    }
  },
  SET_GAMES(state, games) {
    state.games = games
  },
  ADD_GAME(state, game) {
    state.games.push(game)
  },
  UPDATE_GAME(state, game) {
    const gameIndex = state.games.findIndex(_game => _game.id === game.id)
    if (gameIndex >= 0) {
      state.games.splice(gameIndex, 1, game)
    }
  },
  REMOVE_GAME(state, gameId) {
    const index = state.games.findIndex(game => game.id === gameId)
    if (index >= 0) {
      state.games.splice(index, 1)
    }
  }
}

export const getters = {
  gameSwapPreferences: state =>
    [
      ...state.genres.map(genre => generateEntitiesPreference(genre, 'genres')),
      ...state.themes.map(theme => generateEntitiesPreference(theme, 'themes'))
    ]
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map(gameSwapPreference => {
        const swapPreference = state.swapPreferences.find(
          _swapPreference =>
            _swapPreference.igdbId === gameSwapPreference.igdbId &&
            _swapPreference.igdbType === gameSwapPreference.igdbType
        )
        return swapPreference
          ? { ...gameSwapPreference, ...swapPreference }
          : gameSwapPreference
      })
}

export const state = {
  genres: [],
  themes: [],
  swapPreferences: [],
  games: []
}
