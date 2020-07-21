<template>
  <v-container grid-list-xl mt-2 supported-platforms>
    <h2 class="display-1 text-xs-center my-3">
      Supported Platforms
    </h2>
    <v-layout row wrap>
      <v-flex v-for="platform in platforms" :key="platform.igdbId" xs6 sm4 md3 lg2>
        <nuxt-link :to="getPlatformGamesBrowseUrl(platform)" class="no-style-link">
          <v-card
            height="150px"
            color="grey lighten-2"
            hover
            class="grey--text text--darken-4"
          >
            <div :class="platform.slug" class="logo-container">
              <v-card-media-custom
                :src="getPlatformLogoSrc(platform.slug)"
                height="110px"
              />
            </div>
            <v-card-title class="pa-1">
              <h3 style="width: 100%" class="text-xs-center">
                {{ platform.name }}
              </h3>
            </v-card-title>
          </v-card>
        </nuxt-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import platforms from '../../../../common/configs/platforms'
import { getFilteredGameBrowseUrlByField } from '../../../utils/adapters/igdb'
import igdb from '../../../utils/mixins/igdb'

const getFilteredGameBrowseUrlByPlatform = getFilteredGameBrowseUrlByField(
  'release_dates.platform'
)

export default {
  mixins: [igdb],
  data() {
    return {
      platforms
    }
  },
  methods: {
    getPlatformGamesBrowseUrl(platform) {
      return getFilteredGameBrowseUrlByPlatform({
        ...platform,
        ...{ id: platform.igdbId }
      })
    }
  }
}
</script>

<style lang="stylus">
.supported-platforms
  img
    width 70%
    margin 0 auto
  .dc
    img
      width 55%
</style>
