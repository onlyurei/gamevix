<template>
  <v-container>
    <breadcrumbs />
    <v-layout row wrap>
      <v-flex :sm9="isFiltering" :lg10="isFiltering" xs12>
        <h1 class="mb-1">
          {{ heading }}
        </h1>
        <p class="mb-2">
          {{ maxOffset }} games
        </p>
      </v-flex>
      <v-flex v-if="isFiltering" sm3 lg2 xs12>
        <game-browse-sorter />
      </v-flex>
    </v-layout>
    <igdb-entity-grid-list
      :entities="games"
      :highlighter="highlighter"
      entity-name="game"
    />
    <pagination v-bind="{ maxOffset }" />
  </v-container>
</template>

<script>
import { camelCase, startCase, upperFirst } from 'lodash'
import { mapState } from 'vuex'
import GameBrowseSorter from '../../../components/game-browse-sorter.vue'
import { getFilteredFieldName } from '../../../utils/adapters/igdb'
import highlighters from '../../../utils/mixins/game-card-highlighters'
import { paginate, pagination } from '../../../utils/mixins/pagination'

const predefinedSlugs = [
  'recentlyReleased',
  'toBeReleased',
  'mostAnticipated',
  'popular',
  'bestRated'
]
const filteringSlug = 'filteredBy'

export default {
  components: {
    GameBrowseSorter
  },
  mixins: [highlighters, pagination],
  async asyncData({ params, query, store, route, redirect }) {
    let { slug } = params
    slug = camelCase(slug)
    if (predefinedSlugs.indexOf(slug) < 0) {
      slug = filteringSlug
    }

    const { filters, slug: querySlug, name: filterName, order } = query
    if (slug === filteringSlug && !filters) {
      return redirect(`/${params.slug}`)
    }

    async function dispatchBrowse(queries, paginationParams) {
      return store.dispatch(`games_browse/get${upperFirst(slug)}`, {
        ...queries,
        ...paginationParams
      })
    }

    await paginate(route, dispatchBrowse, { filters, order })
    return { filters, slug, querySlug, filterName }
  },
  head() {
    return {
      title: `${this.heading}`
    }
  },
  computed: {
    heading() {
      if (this.isFiltering) {
        let filteredFiledName = getFilteredFieldName(this.filters)
        if (filteredFiledName[filteredFiledName.length - 1] === 's') {
          filteredFiledName = filteredFiledName.slice(0, filteredFiledName.length - 1)
        }
        return `Game ${startCase(filteredFiledName)}: ${
          this.filterName ? this.filterName : startCase(this.querySlug)
        }`
      }
      return `${startCase(this.slug)} Games`
    },
    games() {
      return this[this.slug] && this[this.slug]
    },
    highlighter() {
      if (
        ['recentlyReleased', 'toBeReleased', 'mostAnticipated'].indexOf(this.slug) > -1
      ) {
        return this.releaseDateHighlighter
      }
      if (this.slug === 'popular') {
        return this.popularityHighlighter
      }
      if (this.slug === 'bestRated') {
        return this.ratingHighlighter
      }
      return null
    },
    ...mapState('games_browse', [...predefinedSlugs, filteringSlug]),
    maxOffset() {
      return parseInt(this[this.slug] && this[this.slug].scrollCount)
    },
    isFiltering() {
      return this.slug === filteringSlug
    }
  },
  methods: {
    startCase
  }
}
</script>
