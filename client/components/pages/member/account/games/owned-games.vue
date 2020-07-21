<template>
  <div>
    <h2 class="mt-4 mb-2 headline">
      Games You Own ({{ games.length }})
    </h2>
    <span v-if="!games.length">None</span>
    <transition-group name="fade" tag="div" class="layout row wrap">
      <game-slim-card
        v-for="game in sortedGames"
        :key="game.id"
        v-bind="{ game }"
        class="mt-2"
      >
        <template v-if="!game.futureOwner">
          <v-btn
            flat
            small
            color="grey"
            @click="
              $store.dispatch('member_account/removeGame', {
                id: $store.state.passport.id,
                gameId: game.id
              })
            "
          >
            Remove
          </v-btn>
          <v-btn
            flat
            small
            color="white"
            @click="
              $store.dispatch('member_account/toggleGameAvailableForSwap', {
                id: $store.state.passport.id,
                game
              })
            "
          >
            Available for Swap&nbsp;
            <v-icon :color="game.availableForSwap ? 'green' : 'red'">
              {{ game.availableForSwap ? 'check_box' : 'check_box_outline_blank' }}
            </v-icon>
          </v-btn>
        </template>
        <v-chip v-else label small color="primary" text-color="white">
          Selected for Swap
        </v-chip>
      </game-slim-card>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { sortBy } from 'lodash'
import GameSlimCard from '../../../../game-slim-card.vue'

export default {
  components: {
    GameSlimCard
  },
  computed: {
    ...mapState('member_account', ['games']),
    sortedGames() {
      return sortBy(this.games, game => !game.futureOwner)
    }
  }
}
</script>
