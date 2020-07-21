<template>
  <div v-if="show" id="images" class="mt-3">
    <h2 class="mb-1">
      <a href="#images" class="no-style-link">Screenshots</a>
    </h2>
    <meta
      v-for="(item, i) in screenshots"
      :key="i"
      :content="getImageRendition(item.url, '1080p')"
      itemprop="screenshot"
    >
    <lazy-component>
      <v-carousel hide-delimiters lazy>
        <v-carousel-item
          v-for="(item, i) in screenshots"
          :key="i"
          :src="getImageRendition(item.url, carouselRendition)"
        />
      </v-carousel>
    </lazy-component>
  </div>
</template>

<script>
import igdb from '../../../../utils/mixins/igdb'
import igdbGame from '../../../../utils/mixins/igdb-game'

export default {
  mixins: [igdbGame, igdb],
  computed: {
    show() {
      const show = this.game.screenshots && this.game.screenshots.length
      if (show) {
        this.$emit('show')
      }
      return show
    },
    screenshots() {
      const screenshots = this.game.screenshots
      if (screenshots && screenshots.length) {
        return [...screenshots.slice(1), screenshots[0]]
      }
      return []
    },
    carouselRendition() {
      if (this.$vuetify.breakpoint.xs) {
        return 'screenshot_big'
      }
      if (this.$vuetify.breakpoint.sm) {
        return 'screenshot_big'
      }
      if (this.$vuetify.breakpoint.md) {
        return 'screenshot_big'
      }
      if (this.$vuetify.breakpoint.lg) {
        return 'screenshot_huge'
      }
      if (this.$vuetify.breakpoint.xl) {
        return '1080p'
      }
      return 'screenshot_big'
    }
  }
}
</script>

<style lang="stylus">
.main
  &.games-slug
    .carousel
      box-shadow none
    .xs
      .carousel
        height 250px

    .sm
      .carousel
        height 300px

    .md
      .carousel
        height 350px

    .lg
      .carousel
        height 500px

    .xl
      .carousel
        height 600px
</style>
