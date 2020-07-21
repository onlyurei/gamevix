<template>
  <div itemscope itemtype="http://schema.org/Article" class="game-pulse">
    <v-card
      :style="{ backgroundColor: `rgba(${backgroundRGB},.72)` }"
      :height="cardHeight"
      class="white--text"
    >
      <v-container fluid>
        <v-layout row wrap>
          <v-flex order-xs2 order-sm1 xs12 sm7 pa-0>
            <v-card-title primary-title>
              <div class="text">
                <h3 class="subheading title">
                  <span itemprop="headline">{{ title }}</span>
                </h3>
                <meta :content="image" itemprop="image">
                <div class="summary" itemprop="description">
                  {{ stripTags(summary) }}
                </div>
                <meta :content="url" itemprop="url">
              </div>
            </v-card-title>
          </v-flex>
          <v-flex order-xs1 order-sm2 xs12 sm5 pa-0>
            <lazy-component>
              <v-card-media-custom
                :src="`${image}`.replace('http://', 'https://')"
                :height="imageHeight"
                extract-image-color
                alt=""
                @image-rgb-color-extracted="backgroundRGB = $event"
              />
            </lazy-component>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div
      :style="{ backgroundColor: `rgba(${backgroundRGB},1)` }"
      class="bottom-blocker text-xs-right"
    >
      <v-btn :href="url" target="_blank" rel="nofollow noopener" flat small>
        <time itemprop="datePublished">{{ timestamp }}</time>&nbsp;&nbsp;
        <span>{{ publisher }}</span>
      </v-btn>
      <meta :content="new Date(updatedAt).toLocaleDateString()" itemprop="dateModified">
      <div itemprop="author" itemscope itemtype="http://schema.org/Person">
        <meta :content="author" itemprop="name">
      </div>
      <div itemprop="publisher" itemscope itemtype="http://schema.org/Organization">
        <meta :content="publisher" itemprop="name">
        <meta :content="`http://${publisher}`" itemprop="url">
      </div>
      <meta v-if="entityUrl" :content="entityUrl" itemprop="mainEntityOfPage">
    </div>
  </div>
</template>

<script>
import stripTags from 'striptags'

export default {
  name: 'GamePulse',
  serverCacheKey: props => `${props.url}:${props.updatedAt}`,
  props: {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    image: { type: String, default: '/logo-pa.png' },
    url: { type: String, required: true },
    author: { type: String, required: true },
    publishedAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
    entityUrl: { type: String, default: null }
  },
  data() {
    return {
      backgroundRGB: '12,12,12'
    }
  },
  computed: {
    cardHeight() {
      if (this.$vuetify.breakpoint.xs) {
        return '400px'
      }
      return '230px'
    },
    imageHeight() {
      if (this.$vuetify.breakpoint.xs) {
        return '150px'
      }
      return '200px'
    },
    timestamp() {
      return new Date(this.publishedAt).toLocaleDateString()
    },
    publisher() {
      const domain = `${this.url}`.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/)[0] || ''
      return domain.replace(/http[s]*:\/\//, '')
    }
  },
  methods: {
    stripTags
  }
}
</script>

<style lang="stylus" scoped>
.game-pulse
  overflow hidden
  position relative

.card__title--primary
  padding-top 16px

.title
  margin 0 0 10px
  font-weight 700

.meta
  font-style italic

.summary
  font-size 14px
  line-height 1.25

.bottom-blocker
  position absolute
  bottom 0
  left 0
  height 28px
  width 100%

  .btn
    margin 0
    padding 2px 6px
    font-size 10px
</style>
