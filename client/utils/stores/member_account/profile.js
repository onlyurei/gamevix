const emptyAddress = {
  fullName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  phoneNumber: ''
}

export const actions = {
  async getUser({ commit }, { id }) {
    const res = await this.$axios.get(`/users/${id}`)
    commit('SET_USER', res.data)
  },

  async updateUser({ dispatch }, { id, user }) {
    await this.$axios.patch(`/users/${id}`, user)
    await dispatch('getUser', { id })
  },

  async resendEmailVerification({}, { id }) {
    await this.$axios.patch(`/users/${id}/resend-email-verification`)
  },

  async getAddress({ commit }, { id }) {
    const res = await this.$axios.get(`/users/${id}/address`)
    const address = res.data[0]
    if (address) {
      commit('SET_ADDRESS', address)
    }
  },

  async createAddress({ commit }, { id, address }) {
    const createdAddress = await this.$axios.post(`/addresses`, address)
    if (createdAddress.statusText === 'OK' && createdAddress.data) {
      const user = await this.$axios.put(
        `/users/${id}/address/${createdAddress.data.id}`,
        address
      )
      if (user.statusText === 'OK' && user.data.address) {
        commit('SET_ADDRESS', user.data.address[0])
      }
    }
  },

  async updateAddress({ commit, dispatch }, { id, address }) {
    if (address.id) {
      const res = await this.$axios.patch(`/addresses/${address.id}`, address)
      if (res.statusText === 'OK') {
        commit('SET_ADDRESS', res.data)
      }
    } else {
      await dispatch('createAddress', { id, address })
    }
  },

  async destroyAddress({ commit }, { id, address }) {
    if (address.id) {
      await this.$axios.delete(`/addresses/${address.id}?owner=${id}`)
      commit('SET_ADDRESS', emptyAddress)
    }
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SET_ADDRESS(state, address) {
    state.address = address
  },

  SET_ADDRESS_WARNING_DIALOG(state, addressWarningDialog) {
    state.addressWarningDialog = addressWarningDialog
  }
}

export const getters = {
  hasValidAddress(state) {
    return !!state.address.isComplete
  }
}

export const state = {
  user: {},
  address: { ...emptyAddress },
  addressWarningDialog: false
}
