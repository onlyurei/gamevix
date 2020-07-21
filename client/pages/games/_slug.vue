<template>
  <v-container
    id="top"
    :style="{ backgroundImage: `url(${getImageRendition(backgroundImage, '1080p')})` }"
    :class="$vuetify.breakpoint"
    class="game"
    fluid
    grid-list-xl
  >
    <v-layout row wrap>
      <v-flex xs12 sm6 md7 lg7 xl9>
        <breadcrumbs :inserted-paths="breadcrumbsAdditionalPaths" />
      </v-flex>
      <v-flex xs12 sm6 md5 lg5 xl3 class="social-sharing-container text-xs-right">
        <no-ssr>
          <social-sharing-links
            v-bind="{ title }"
            :description="metaDescription"
            hashtags="gamevix,gameswap,swapgames,videogames"
          />
        </no-ssr>
      </v-flex>
    </v-layout>
    <v-container class="content px-0">
      <div itemscope itemtype="http://schema.org/VideoGame">
        <v-layout row wrap>
          <v-flex xs12 sm8 lg9 order-sm2 class="detail">
            <meta itemprop="applicationCategory" content="Game">
            <h1 itemprop="name" class="break-word">
              {{ game.name }}
            </h1>
            <game-ratings />
            <game-metadata />
            <game-description @show="toc.story = true" />
            <meta :content="keywords" itemprop="keywords">
            <game-time-to-beat />
            <game-screenshots @show="toc.images = true" />
          </v-flex>
          <v-flex v-if="mainImageUrl" xs12 sm4 lg3 order-sm1 class="meta">
            <v-card-media-custom
              :src="mainImageUrl"
              height="0"
              extract-image-color
              @image-rgb-color-extracted="SET_BACKGROUND_RGB($event)"
            />
            <img :src="mainImageUrl" itemprop="image" alt="Game Cover">
            <added-games-list v-bind="{ releaseDates }" :game-id="game.id" class="mt-4" />
            <div id="metadata">
              <game-esrb-rating />
              <game-pegi-rating />
              <game-metadata-list />
            </div>
          </v-flex>
        </v-layout>
        <game-news @show="toc.news = true" />
        <game-reviews @show="toc.reviews = true" />
        <game-twitch-channels @show="toc.twitch = true" />
        <game-videos @show="toc.videos = true" />
      </div>
    </v-container>
    <v-container class="content px-0 mb-5">
      <related-games @show="toc.related = true" />
    </v-container>
    <toc-fab v-bind="{ tocs }" />
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import supportedPlatforms from '../../../common/configs/platforms'
import AddedGamesList from '../../components/added-games-list.vue'
import GameDescription from '../../components/pages/games/_slug/description.vue'
import GameEsrbRating from '../../components/pages/games/_slug/esrb-rating.vue'
import GameMetadataList from '../../components/pages/games/_slug/metadata-list.vue'
import GameMetadata from '../../components/pages/games/_slug/metadata.vue'
import GameNews from '../../components/pages/games/_slug/news.vue'
import GamePegiRating from '../../components/pages/games/_slug/pegi-rating.vue'
import GameRatings from '../../components/pages/games/_slug/ratings.vue'
import GameReviews from '../../components/pages/games/_slug/reviews.vue'
import RelatedGames from '../../components/pages/games/_slug/related-games.vue'
import GameScreenshots from '../../components/pages/games/_slug/screenshots.vue'
import GameTimeToBeat from '../../components/pages/games/_slug/time-to-beat.vue'
import TocFab from '../../components/pages/games/_slug/toc-fab.vue'
import GameTwitchChannels from '../../components/pages/games/_slug/twitch-channels.vue'
import GameVideos from '../../components/pages/games/_slug/videos.vue'
import { getFilteredGameBrowseUrl } from '../../utils/adapters/igdb'
import igdb from '../../utils/mixins/igdb'
import igdbGame from '../../utils/mixins/igdb-game'

export default {
  components: {
    GameRatings,
    GameMetadata,
    GameDescription,
    GameTimeToBeat,
    GameScreenshots,
    AddedGamesList,
    GameEsrbRating,
    GamePegiRating,
    GameMetadataList,
    GameNews,
    GameTwitchChannels,
    GameVideos,
    GameReviews,
    RelatedGames,
    TocFab
  },
  mixins: [igdb, igdbGame],
  data() {
    return {
      toc: {
        top: true,
        story: false,
        images: false,
        metadata: true,
        news: false,
        reviews: false,
        twitch: false,
        videos: false,
        related: false
      }
    }
  },
  computed: {
    tocs() {
      return Object.entries(this.toc)
        .filter(toc => toc[1])
        .map(toc => toc[0])
        .reverse()
    },
    title() {
      const swappablePlatforms = this.platforms.length
        ? `${this.platforms
            .filter(platform =>
              supportedPlatforms.some(
                supportedPlatform => supportedPlatform.slug === platform.slug
              )
            )
            .map(platform => platform.name)
            .join(', ')}`
        : ''
      return `${this.game && this.game.name}${
        swappablePlatforms ? ` - Swap this game on ${swappablePlatforms}` : ''
      }`
    },
    breadcrumbsAdditionalPaths() {
      let entity = {}
      let field = ''
      if (this.genre) {
        entity = this.genre
        field = 'genres'
      } else if (this.theme) {
        entity = this.theme
        field = 'themes'
      } else if (this.franchise) {
        entity = this.franchise
        field = 'franchise'
      } else if (this.collection) {
        entity = this.collection
        field = 'collection'
      }
      if (entity && entity.name) {
        entity = {
          ...entity,
          ...{
            field,
            value: entity.id,
            postfix: 'eq'
          }
        }
        return [
          {
            text: entity.name,
            to: getFilteredGameBrowseUrl(entity)
          }
        ]
      }
      return null
    },
    keywords() {
      function getKeywordsFromEntity(entity) {
        if (entity) {
          if (entity.length) {
            return entity.map(_entity => _entity.name)
          }
          return [entity.name]
        }
        return []
      }

      return [
        ...new Set([
          this.game.name,
          ...getKeywordsFromEntity(this.game.alternative_names),
          ...getKeywordsFromEntity(this.game.keywords),
          ...getKeywordsFromEntity(this.game.themes),
          ...getKeywordsFromEntity(this.game.genres),
          ...getKeywordsFromEntity(this.franchise),
          ...getKeywordsFromEntity(this.collection),
          ...getKeywordsFromEntity(this.game.publishers),
          ...getKeywordsFromEntity(this.game.developers)
        ])
      ]
        .filter(keyword => keyword)
        .join(',')
    },
    backgroundImage() {
      return (
        this.game.screenshots &&
        this.game.screenshots.length &&
        this.game.screenshots[0].url
      )
    }
  },
  async fetch({ store, params, redirect }) {
    const { slug } = params
    await store.dispatch('games_slug/getGame', { slug })
    const game = store.state.games_slug.game
    if (!game) {
      return redirect('/games')
    }
    await Promise.all([
      store.dispatch('games_slug/getPulseGroups'),
      store.dispatch('games_slug/getReviews')
    ])
    await store.dispatch('games_slug/getSummarizedFullDescription')
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription
        },
        {
          name: 'og:image',
          content: this.mainImageUrl
        }
      ]
    }
  },
  async beforeMount() {
    this.SET_BACKGROUND_RGB()
    this.$store.dispatch('games_slug/getPlatforms')
    this.$store.dispatch('games_slug/getCollection')
    this.$store.dispatch('games_slug/getFranchise')
  },
  methods: {
    ...mapMutations('games_slug', ['SET_BACKGROUND_RGB'])
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
$background-height = 100%

.game
  background top center / cover no-repeat fixed
  &:before
  &:after
    content ""
    width 100%
    position fixed
    left 0
  &:before
    top 48px
    height $background-height
    background linear-gradient(to bottom, rgba(33, 33, 33, .333), rgba(11, 11, 11, 1))
  &:after
    height "calc(100% - %s + 100px)" % $background-height
    background #303030
    top $background-height
  .breadcrumbs
    position relative
    top -12px
    margin-bottom 0

  .social-sharing-container
    position relative
    z-index 1
    padding-bottom 0 !important

  h1
    margin-bottom 0
  .content
    position relative
    z-index 1
    .detail
      margin-top 115px
      display flex
      flex-wrap wrap
      align-items top
      align-content space-between
      > *
        width 100%
    .meta
      margin-top 30px
      img
        width 100%
        height auto

  &.smAndDown
    .content
      .detail
      .meta
        margin-top 10px
</style>

<style rel="stylesheet/stylus" lang="stylus">
.main.games-slug
  > .content--wrap
    > .container
      padding 0

  dt
    font-weight 700
</style>
