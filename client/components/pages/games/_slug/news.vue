<template>
  <div v-if="show" id="news" class="mt-5">
    <v-layout row wrap>
      <v-flex xs12 class="py-0">
        <h2><a href="#news" class="no-style-link">News</a></h2>
      </v-flex>
    </v-layout>
    <game-pulses v-bind="{ pulses }" :limit="24" :entity-url="website && website.url" />
  </div>
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'

export default {
  mixins: [igdbGame],
  computed: {
    show() {
      const show = this.pulses.length
      if (show) {
        this.$emit('show')
      }
      return show
    }
  }
}
</script>
