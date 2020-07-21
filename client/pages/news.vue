<template>
  <v-container grid-list-xl>
    <breadcrumbs />
    <h1 class="mb-1">
      Latest Game News
    </h1>
    <div v-if="lastUpdatedAt">
      Last updated: <time>{{ lastUpdatedAt }}</time>
    </div>
    <game-pulses v-bind="{ pulses }" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import GamePulse from '../components/game-pulse.vue'

export default {
  components: { GamePulse },
  async fetch({ store }) {
    await store.dispatch('entities_browse/getPulses')
  },
  head() {
    return { title: 'Latest Game News' }
  },
  computed: {
    lastUpdatedAt() {
      if (this.pulses.length) {
        const lastPulse = this.pulses[0]
        return `${new Date(lastPulse.published_at).toLocaleDateString()} ${new Date(
          lastPulse.published_at
        ).toLocaleTimeString()}`
      }
      return ''
    },
    ...mapState('entities_browse', ['pulses'])
  }
}
</script>
