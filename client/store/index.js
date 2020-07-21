export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_PASSPORT(state, passport) {
    state.passport = passport
  },
  SET_IS_ADMIN_USER(state, isAdminUser) {
    state.isAdminUser = isAdminUser
  }
}

export const actions = {
  // called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.passport) {
      if (req.session.passport.user) {
        commit('SET_PASSPORT', req.session.passport.user)
      } else {
        commit('SET_PASSPORT', req.session.passport)
      }
    }
  },
  async login({ commit }, { identifier, password }) {
    try {
      const { data } = await this.$axios.post('/auth/local', { identifier, password })
      commit('SET_PASSPORT', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async signup({ commit }, payload) {
    try {
      const { data } = await this.$axios.post('/register', payload)
      commit('SET_PASSPORT', data)
    } catch (error) {
      throw error
    }
  },
  async logout({ commit }) {
    await this.$axios.post('/logout')
    commit('SET_PASSPORT', null)
  },
  async setIsAdminUser({ commit, state }) {
    if (!state.passport) {
      return commit('SET_IS_ADMIN_USER', false)
    }
    try {
      const { data } = await this.$axios.get(`/admins?userId=${state.passport.id}`)
      if (data.length && data[0].userId === state.passport.id) {
        commit('SET_IS_ADMIN_USER', true)
      } else {
        commit('SET_IS_ADMIN_USER', false)
      }
    } catch (e) {
      commit('SET_IS_ADMIN_USER', false)
    }
  }
}

export const state = () => ({
  locales: ['en'],
  locale: 'en',
  passport: null,
  isAdminUser: false
})
