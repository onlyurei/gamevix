import {
  actions as gamesActions,
  mutations as gamesMutations,
  getters as gamesGetters,
  state as gamesState
} from '../utils/stores/member_account/games'

import {
  actions as consolesActions,
  mutations as consolesMutations,
  state as consolesState
} from '../utils/stores/member_account/consoles'

import {
  actions as profileActions,
  mutations as profileMutations,
  getters as profileGetters,
  state as profileState
} from '../utils/stores/member_account/profile'

export const actions = {
  ...gamesActions,
  ...consolesActions,
  ...profileActions
}

export const mutations = {
  ...gamesMutations,
  ...consolesMutations,
  ...profileMutations,
  SET_TAB_ID(state, tabId) {
    state.tabId = tabId
  }
}

export const getters = {
  ...gamesGetters,
  ...profileGetters
}

export const state = () => ({
  ...gamesState,
  ...consolesState,
  ...profileState,
  tabId: 'games'
})
