<template>
  <div>
    <h2 class="mt-4 mb-2 headline">
      Add Games
    </h2>
    <v-layout>
      <v-flex xs12>
        <v-text-field
          v-model.trim="searchQuery"
          :loading="searching"
          clearable
          label="Search Games..."
        />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <game-slim-card
        v-for="game in searchResultsGames"
        :key="`${game.id}${game.platform}`"
        v-bind="{ game }"
        class="mt-2"
      >
        <v-btn
          v-if="
            !games.find(
              addedGame =>
                addedGame.igdbId === game.id &&
                addedGame.platform.igdbId === game.platform
            )
          "
          small
          block
          class="mt-2"
          @click="
            $store.dispatch('member_account/addGame', {
              id: $store.state.passport.id,
              igdbGameId: game.id,
              igdbPlatformId: game.platform
            })
          "
        >
          Add
        </v-btn>
        <v-btn v-else small block disabled class="mt-2">
          Added
        </v-btn>
      </game-slim-card>
    </v-layout>
  </div>
</template>

<script>
import { debounce, flatten } from 'lodash'
import { mapState } from 'vuex'
import GameSlimCard from '../../../../game-slim-card.vue'

export default {
  components: {
    GameSlimCard
  },
  data() {
    return {
      searchQuery: '',
      searching: false
    }
  },
  computed: {
    ...mapState('search', ['searchResults']),
    ...mapState('member_account', ['games']),
    searchResultsGames() {
      const searchResultsGames = this.searchResults && this.searchResults
      const now = new Date()
      if (Array.isArray(searchResultsGames)) {
        return flatten(
          searchResultsGames.map(searchResultsGame => {
            if (Array.isArray(searchResultsGame.release_dates)) {
              const platforms = [
                ...new Set(
                  searchResultsGame.release_dates
                    .filter(release_date => release_date.date < now)
                    .map(release_date => release_date.platform)
                )
              ]
              return platforms.map(platform => ({
                ...searchResultsGame,
                ...{ platform }
              }))
            }
            return searchResultsGame
          })
        ).filter(game => game.platform)
      }
      return []
    }
  },
  watch: {
    searchQuery() {
      this.$store.commit('search/SET_QUERY', this.searchQuery)
      this.searchGames()
    }
  },
  created() {
    this.searchQuery = this.$store.state.search.query
  },
  methods: {
    searchGames: debounce(async function() {
      if (this.searchQuery) {
        try {
          this.searching = true
          await this.$store.dispatch('search/query', {
            search: this.searchQuery
          })
        } finally {
          this.searching = false
        }
      } else {
        this.clearSearch()
      }
    }, 1500),
    clearSearch() {
      this.searchQuery = ''
      this.$store.commit('search/SET_SEARCH_RESULTS', {})
    }
  }
}
</script>
