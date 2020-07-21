<template>
  <v-container>
    <breadcrumbs />
    <h1 class="mb-1">
      Game {{ startCase(entitiesName) }}
    </h1>
    <p class="mb-2">
      {{ maxOffset }}
    </p>
    <igdb-entity-grid-list
      v-bind="{ entities: entities, textColor }"
      :url-overrider="getFilteredGameBrowseUrlByField(field)"
      text-only
    />
    <pagination v-bind="{ maxOffset }" />
  </v-container>
</template>

<script>
import { startCase } from 'lodash'
import { mapState } from 'vuex'
import { getFilteredGameBrowseUrlByField } from '../../utils/adapters/igdb'

export default {
  props: {
    entitiesName: { type: String, required: true },
    field: { type: String, required: true },
    textColor: { type: String, default: '' }
  },
  computed: {
    ...mapState('entities_browse', [
      'keywords',
      'collections',
      'franchises',
      'genres',
      'platforms',
      'themes'
    ]),
    entities() {
      return this[this.entitiesName]
    },
    maxOffset() {
      return parseInt(this.entities && this.entities.scrollCount)
    }
  },
  methods: {
    getFilteredGameBrowseUrlByField,
    startCase
  }
}
</script>
