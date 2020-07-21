<template>
  <v-container grid-list-lg class="pb-4">
    <h2 class="display-1 my-3 text-xs-center">
      New Games
    </h2>
    <igdb-entity-grid-list
      :entities="games"
      :highlighter="releaseDateHighlighter"
      :see-more-link="{ to: '/games', text: 'See All Games' }"
      entity-name="game"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import highlighters from '../../../utils/mixins/game-card-highlighters'

export default {
  mixins: [highlighters],
  computed: {
    ...mapState('games_browse', ['recentlyReleased', 'toBeReleased']),
    games() {
      return [
        ...(this.recentlyReleased || []).slice(0, 6).reverse(),
        ...(this.toBeReleased || []).slice(0, 6)
      ]
    }
  }
}
</script>
