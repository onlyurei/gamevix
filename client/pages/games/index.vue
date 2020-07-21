<template>
  <v-container>
    <breadcrumbs />
    <h1>Games</h1>
    <v-subheader class="px-0">
      Recently Released
    </v-subheader>
    <igdb-entity-grid-list
      :entities="recentlyReleased"
      :see-more-link="{
        to: '/games/browse/recently-released',
        text: 'See All Recently Released Games'
      }"
      :highlighter="releaseDateHighlighter"
      entity-name="game"
    />
    <v-subheader class="px-0">
      To Be Released
    </v-subheader>
    <igdb-entity-grid-list
      :entities="toBeReleased"
      :see-more-link="{
        to: '/games/browse/to-be-released',
        text: 'See All To Be Released Games'
      }"
      :highlighter="releaseDateHighlighter"
      entity-name="game"
    />
    <v-subheader class="px-0">
      Most Anticipated
    </v-subheader>
    <igdb-entity-grid-list
      :entities="mostAnticipated"
      :see-more-link="{
        to: '/games/browse/most-anticipated',
        text: 'See All Most Anticipated Games'
      }"
      :highlighter="releaseDateHighlighter"
      entity-name="game"
    />
    <v-subheader class="px-0">
      Popular
    </v-subheader>
    <igdb-entity-grid-list
      :entities="popular"
      :see-more-link="{ to: '/games/browse/popular', text: 'See All Popular Games' }"
      :highlighter="popularityHighlighter"
      entity-name="game"
    />
    <v-subheader class="px-0">
      Best Rated
    </v-subheader>
    <igdb-entity-grid-list
      :entities="bestRated"
      :see-more-link="{
        to: '/games/browse/best-rated',
        text: 'See All Best Rated Games'
      }"
      :highlighter="ratingHighlighter"
      entity-name="game"
    />
    <v-divider />
    <v-subheader class="px-0">
      Genres
    </v-subheader>
    <igdb-entity-grid-list
      :entities="genres"
      :see-more-link="{ to: '/genres', text: 'See All Game Genres' }"
      :url-overrider="getFilteredGameBrowseUrlByField('genres')"
      text-only
      text-color="warning"
    />
    <v-divider />
    <v-subheader class="px-0">
      Themes
    </v-subheader>
    <igdb-entity-grid-list
      :entities="themes"
      :see-more-link="{ to: '/themes', text: 'See All Game Themes' }"
      :url-overrider="getFilteredGameBrowseUrlByField('themes')"
      text-only
      text-color="primary"
    />
    <v-divider />
    <v-subheader class="px-0">
      Platforms
    </v-subheader>
    <igdb-entity-grid-list
      :entities="platforms"
      :see-more-link="{ to: '/platforms', text: 'See All Game Platforms' }"
      :url-overrider="getFilteredGameBrowseUrlByField('release_dates.platform')"
      text-only
      text-color="error"
    />
    <v-divider />
    <v-subheader class="px-0">
      Franchises
    </v-subheader>
    <igdb-entity-grid-list
      :entities="franchises"
      :see-more-link="{ to: '/franchises', text: 'See All Game Franchises' }"
      :url-overrider="getFilteredGameBrowseUrlByField('franchise')"
      text-only
      text-color="accent"
    />
    <v-divider />
    <v-subheader class="px-0">
      Collections
    </v-subheader>
    <igdb-entity-grid-list
      :entities="collections"
      :see-more-link="{ to: '/collections', text: 'See All Game Collections' }"
      :url-overrider="getFilteredGameBrowseUrlByField('collection')"
      text-only
      text-color="info"
    />
    <v-divider />
    <v-subheader class="px-0">
      Keywords
    </v-subheader>
    <igdb-entity-grid-list
      :entities="keywords"
      :see-more-link="{ to: '/keywords', text: 'See All Game Keywords' }"
      :url-overrider="getFilteredGameBrowseUrlByField('keywords')"
      text-only
      text-color="primary"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { getFilteredGameBrowseUrlByField } from '../../utils/adapters/igdb'
import highlighters from '../../utils/mixins/game-card-highlighters'

export default {
  mixins: [highlighters],
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('games_browse/getRecentlyReleased'),
      store.dispatch('games_browse/getToBeReleased'),
      store.dispatch('games_browse/getMostAnticipated'),
      store.dispatch('games_browse/getPopular'),
      store.dispatch('games_browse/getBestRated'),
      store.dispatch('entities_browse/getKeywords'),
      store.dispatch('entities_browse/getCollections'),
      store.dispatch('entities_browse/getFranchises'),
      store.dispatch('entities_browse/getGenres'),
      store.dispatch('entities_browse/getPlatforms'),
      store.dispatch('entities_browse/getThemes')
    ])
  },
  head() {
    return {
      title: 'Games'
    }
  },
  computed: {
    ...mapState('games_browse', [
      'recentlyReleased',
      'toBeReleased',
      'mostAnticipated',
      'popular',
      'bestRated'
    ]),
    ...mapState('entities_browse', [
      'keywords',
      'collections',
      'franchises',
      'genres',
      'platforms',
      'themes'
    ])
  },
  methods: {
    getFilteredGameBrowseUrlByField
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.divider
  margin-top 20px
  margin-bottom 10px
</style>
