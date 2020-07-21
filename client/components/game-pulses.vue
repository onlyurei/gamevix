<template>
  <v-layout row wrap>
    <v-flex v-for="pulse in displayedPulses" :key="pulse.id" xs12 lg6>
      <game-pulse
        :title="pulse.title"
        :summary="pulse.summary"
        :image="pulse.image"
        :url="pulse.url"
        :author="pulse.author"
        :published-at="pulse.published_at"
        :updated-at="pulse.updated_at"
        v-bind="$attrs"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import GamePulse from './game-pulse.vue'

export default {
  components: {
    GamePulse
  },
  props: {
    pulses: { type: Array, default: () => [] },
    limit: { type: Number, default: null }
  },
  computed: {
    displayedPulses() {
      return this.limit ? this.pulses.slice(0, this.limit) : this.pulses
    }
  }
}
</script>
