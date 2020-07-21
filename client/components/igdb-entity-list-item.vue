<template>
  <v-btn
    v-if="textOnly && url"
    :to="url"
    :color="textColor"
    flat
    router
    nuxt
    class="text-xs-center d-block mt-0 mb-0"
  >
    {{ entity.name && entity.name.substr ? entity.name.substr(0, 35) : entity.name }}
  </v-btn>
  <nuxt-link
    v-else-if="url"
    :to="url"
    class="no-style-link"
    itemscope
    itemtype="http://schema.org/VideoGame"
  >
    <v-card
      :style="{ backgroundColor: `rgba(${backgroundRGB},1)` }"
      height="200px"
      hover
      class="white--text"
    >
      <meta itemprop="applicationCategory" content="Game">
      <meta :content="mainImageUrls[0]" itemprop="image">
      <meta :content="description" itemprop="description">
      <template v-if="websites.length">
        <meta
          v-for="website in websites"
          :key="website.url"
          :content="website.url"
          itemprop="sameAs"
        >
      </template>
      <meta :content="`${host.origin}/games/${entity.slug}`" itemprop="url">
      <div
        v-if="entity.total_rating"
        itemprop="aggregateRating"
        itemscope
        itemtype="http://schema.org/AggregateRating"
      >
        <meta itemprop="worstRating" content="1">
        <meta itemprop="bestRating" content="5">
        <meta :content="fiveStarRating" itemprop="ratingValue">
        <meta :content="entity.total_rating_count" itemprop="ratingCount">
      </div>
      <lazy-component>
        <v-card-media-custom
          :src="mainImageUrls[0]"
          :srcset="`${mainImageUrls[0]}, ${mainImageUrls[1]} 1.5x`"
          height="125px"
          alt=""
          extract-image-color
          @image-rgb-color-extracted="backgroundRGB = $event"
        />
      </lazy-component>
      <v-card-title primary-title>
        <div class="text">
          <h3 :style="{ fontSize: `${nameFontSize}px` }" class="mb-0" itemprop="name">
            {{ entity.name }}
          </h3>
          <template v-if="entityName === 'game'">
            <div class="caption" v-html="highlight(entity)" />
            <gamevix-score :game="entity" small />
          </template>
          <div class="platforms">
            <ul>
              <li
                v-for="platform in platforms"
                v-if="platform && platform.name"
                :key="platform && platform.slug"
              >
                <span itemprop="gamePlatform">{{ platform.name }}</span>
                <meta :content="platform.name" itemprop="operatingSystem">
              </li>
            </ul>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </nuxt-link>
</template>

<script>
import { clamp, sortBy, take } from 'lodash'
import host from '../../common/configs/host'
import platforms from '../../common/configs/platforms'
import { getEntityMainImage } from '../../common/igdb'
import igdb from '../utils/mixins/igdb'
import highlighters from '../utils/mixins/game-card-highlighters'
import igdbGameCommon from '../utils/mixins/igdb-game-common'
import GamevixScore from './gamevix-score.vue'

export default {
  name: 'IgdbEntityListItem',
  serverCacheKey: props => JSON.stringify(props),
  components: { GamevixScore },
  mixins: [igdb, igdbGameCommon],
  props: {
    entity: { type: Object, required: true },
    entityName: { type: String, default: '' },
    urlOverrider: { type: Function, default: null },
    highlighter: { type: Function, default: null },
    textOnly: { type: Boolean, default: false },
    textColor: { type: String, default: 'primary' }
  },
  data() {
    return {
      backgroundRGB: '24,24,24',
      host
    }
  },
  computed: {
    highlight() {
      return this.highlighter || highlighters.methods.releaseDateHighlighter
    },
    mainImageUrls() {
      const image = getEntityMainImage(this.entity)
      if (image && image.url) {
        return [
          this.getImageRendition(image.url, 'screenshot_med'),
          this.getImageRendition(image.url, 'screenshot_big')
        ]
      }
      return []
    },
    url() {
      if (this.urlOverrider) {
        return this.urlOverrider(this.entity)
      }
      if (this.entityName && this.entity.slug) {
        return `/${this.entityName}s/${this.entity.slug}`
      }
      return ''
    },
    description() {
      return typeof this.entity.summary === 'string'
        ? this.entity.summary.substr(0, 500)
        : ''
    },
    nameFontSize() {
      return this.entity.name && this.entity.name.length
        ? clamp(Math.floor(455 / this.entity.name.length), 12, 18)
        : 15
    },
    platforms() {
      if (this.entity.release_dates && this.entity.release_dates.length) {
        return take(
          [...new Set(this.entity.release_dates.map(releaseDate => releaseDate.platform))]
            .map(igdbPlatformId =>
              platforms.find(platform => platform.igdbId === igdbPlatformId)
            )
            .filter(platform => platform),
          3
        )
      }
    },
    websites() {
      if (this.entity.websites) {
        return sortBy(this.entity.websites, 'category')
      }
      return []
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
ul
  list-style-type none

h3
  line-height 1.15

.card
  margin-top 5px
  margin-bottom 5px
  .layout
    height 150px
    overflow hidden
  .text
    .platforms
      position absolute
      right 10px
      bottom 6px
      text-align right
      line-height 1.05
      font-size 11px
  .headline
    line-height 1.2 !important
    font-size 18px !important
    font-weight 500 !important
    overflow hidden
  .card__title--primary
    padding-top 15px
    height calc(100% - 125px)
    overflow hidden
</style>
