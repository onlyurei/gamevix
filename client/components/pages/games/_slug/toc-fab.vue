<template>
  <v-speed-dial
    v-model="fab"
    direction="top"
    transition="slide-y-reverse-transition"
    fixed
    bottom
    right
  >
    <v-btn slot="activator" v-model="fab" color="primary" fab hover class="elevation-8">
      <v-icon>toc</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn
      v-for="toc in tocs"
      :key="toc"
      :to="`#${toc}`"
      fab
      color="grey lighten-4"
      class="dial black--text elevation-10"
    >
      {{ startCase(toc) }}
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { startCase } from 'lodash'

export default {
  props: {
    tocs: { type: Array, default: () => [] }
  },
  data() {
    return {
      fab: false
    }
  },
  methods: {
    startCase
  }
}
</script>

<style lang="stylus" scoped>
.speed-dial--fixed
  z-index 4

.dial
  font-size 10px
  font-weight 700
</style>
