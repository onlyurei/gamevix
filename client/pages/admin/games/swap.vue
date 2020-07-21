<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs10 xl11>
        <h1>Swap Games</h1>
      </v-flex>
      <v-flex xs2 xl1 text-xs-right>
        <v-btn color="primary" small class="mx-0 mt-2" @click="refresh">
          Refresh
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-4>
      <v-flex xs5 sm7 md8 lg9 xl10>
        <h2 class="pa-0 ma-0">
          Swappable Games
        </h2>
      </v-flex>
      <v-flex xs7 sm5 md4 lg3 xl2 text-xs-right>
        <v-btn color="error" small class="mx-0 mt-0" @click="swapGames">
          Swap Games
        </v-btn>
      </v-flex>
    </v-layout>
    <swappable-games-data-table :games="swappableGames" v-bind="{ loading }" />
    <v-layout row wrap mt-5>
      <v-flex xs9>
        <h2 class="pa-0 ma-0">
          Pending-Swap Games
        </h2>
      </v-flex>
      <v-flex xs3 text-xs-right>
        <v-flex>
          <v-btn color="error" small class="mx-0 mt-0" @click="cancelSwaps">
            Cancel Swaps
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
    <swappable-games-data-table :games="pendingSwapGames" v-bind="{ loading }" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SwappableGamesDataTable from '../../../components/pages/admin/games/swap/swappable-games-data-table.vue'

export default {
  components: {
    SwappableGamesDataTable
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('admin_games_swap/getSwappableGames'),
      store.dispatch('admin_games_swap/getPendingSwapGames')
    ])
  },
  middleware: 'admin',
  computed: {
    ...mapState('admin_games_swap', ['swappableGames', 'pendingSwapGames', 'loading'])
  },
  methods: {
    ...mapActions('admin_games_swap', [
      'getSwappableGames',
      'swapGames',
      'getPendingSwapGames',
      'refresh',
      'cancelSwaps'
    ])
  }
}
</script>
