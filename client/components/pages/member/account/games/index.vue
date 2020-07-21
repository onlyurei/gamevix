<template>
  <v-container grid-list-lg class="no-padding">
    <swap-preferences />
    <owned-games />
    <address-warning-dialog />
    <add-games />
  </v-container>
</template>

<script>
import AddGames from './add-games.vue'
import AddressWarningDialog from './address-warning-dialog.vue'
import OwnedGames from './owned-games.vue'
import SwapPreferences from './swap-preferences.vue'

export default {
  components: {
    AddGames,
    AddressWarningDialog,
    OwnedGames,
    SwapPreferences
  },
  computed: {
    hash() {
      return this.$route.hash
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      const id = this.$store.state.passport.id
      this.$store.dispatch('member_account/getGames', { id })
      this.$store.dispatch('member_account/getGenres')
      this.$store.dispatch('member_account/getThemes')
      this.$store.dispatch('member_account/getSwapPreferences', { id })
    }
  }
}
</script>
