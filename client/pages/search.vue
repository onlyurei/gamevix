<template>
  <v-container>
    <breadcrumbs />
    <h1 class="mb-1">
      Search Results
    </h1>
    <p class="mb-2">
      {{ maxOffset }} results for "{{ q }}"
    </p>
    <igdb-entity-grid-list
      :entities="searchResults && searchResults"
      entity-name="game"
    />
    <pagination v-if="maxOffset" v-bind="{ maxOffset }" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { paginate, pagination } from '../utils/mixins/pagination'

export default {
  mixins: [pagination],
  watchQuery: true,
  async asyncData({ query, store, route }) {
    const { q } = query

    async function dispatchSearch(queries, paginationParams) {
      store.commit('search/SET_QUERY', q)
      return store.dispatch('search/query', { ...queries, ...paginationParams })
    }

    await paginate(route, dispatchSearch, { search: q })
    return { q }
  },
  head() {
    return {
      title: `${this.q} - Search Results`
    }
  },
  computed: {
    ...mapState('search', ['searchResults']),
    maxOffset() {
      return parseInt(this.searchResults && this.searchResults.scrollCount) || 0
    }
  }
}
</script>
