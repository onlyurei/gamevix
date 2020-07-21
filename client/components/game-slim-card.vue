<template>
  <v-flex v-if="isGameOnSupportedPlatforms" xs12 sm6 md4 lg4 xl3>
    <nuxt-link :to="`/games/${game.slug}`" class="no-style-link">
      <v-card
        :style="{ backgroundColor: `rgba(${backgroundRGB},1)` }"
        height="88px"
        hover
        class="white--text"
      >
        <v-container fluid grid-list-md>
          <v-layout row>
            <v-flex xs7>
              <h3
                :style="{ fontSize: getGameNameFontSize(game.name || game.slug) + 'px' }"
                class="game-title"
              >
                {{ game.name || game.slug }}
              </h3>
              <div class="logo-container grey lighten-2">
                <img
                  :src="getPlatformLogoSrc(getPlatformSlug(game.platform))"
                  :alt="getPlatformName(getPlatformSlug(game.platform))"
                  class="platform-logo"
                >
              </div>
            </v-flex>
            <v-flex v-if="game.cover" xs5>
              <lazy-component>
                <v-card-media-custom
                  :src="getCoverUrl(game.cover)"
                  height="64px"
                  extract-image-color
                  @image-rgb-color-extracted="backgroundRGB = $event"
                />
              </lazy-component>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </nuxt-link>
    <div class="game-actions">
      <slot />
    </div>
  </v-flex>
</template>

<script>
import { clamp } from 'lodash'
import platforms from '../../common/configs/platforms.json'
import igdb from '../utils/mixins/igdb'

export default {
  mixins: [igdb],
  props: {
    game: { type: Object, required: true }
  },
  data() {
    return {
      platforms,
      backgroundRGB: '24,24,24'
    }
  },
  computed: {
    isGameOnSupportedPlatforms() {
      if (!this.game.platform) return false
      const platformIgdbId =
        typeof this.game.platform === 'number'
          ? this.game.platform
          : this.game.platform.igdbId
      return platforms.find(platform => platform.igdbId === platformIgdbId)
    }
  },
  methods: {
    getCoverUrl(cover) {
      return this.getImageRendition(cover.url, 'cover_big')
    },
    getPlatformSlug(platform) {
      if (!platform) return ''
      const platformIgdbId = typeof platform === 'number' ? platform : platform.igdbId
      const foundPlatform = platforms.find(
        _platform => _platform.igdbId === platformIgdbId
      )
      return (foundPlatform && foundPlatform.slug) || ''
    },
    getPlatformName(platformSlug) {
      const platform = this.platforms.find(_platform => _platform.slug === platformSlug)
      return (platform && platform.name) || ''
    },
    getGameNameFontSize(gameName) {
      return gameName && gameName.length
        ? clamp(Math.floor(420 / gameName.length), 12, 19)
        : 16
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.game-title
  line-height 1.1
  height 40px
  margin-bottom 2px
  overflow hidden

.logo-container
  height 24px
  padding 2px
  border-radius 4px
  display inline-block

  .platform-logo
    width auto
    height 20px
    max-width 100%

.game-actions
  display flex
  justify-content space-between

  .btn
    margin 0
</style>
