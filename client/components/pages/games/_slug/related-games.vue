<template>
  <v-layout v-if="show" id="related" row wrap mt-3>
    <v-flex xs12>
      <h2 class="mb-1">
        <a href="#related" class="no-style-link">Related Games</a>
      </h2>
      <igdb-entity-grid-list :entities="game.games" entity-name="game" />
    </v-flex>
  </v-layout>
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'

export default {
  mixins: [igdbGame],
  computed: {
    show() {
      const show = this.game.games && this.game.games.length
      if (show) {
        this.$emit('show')
      }
      return show
    }
  }
}
</script>
