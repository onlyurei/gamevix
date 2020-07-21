<template>
  <nuxt-link v-bind="{ to }">
    <slot />
  </nuxt-link>
</template>

<script>
import { getFilteredGameBrowseUrl } from '../utils/adapters/igdb'

export default {
  props: {
    field: { type: String, required: true },
    postfix: { type: String, required: true },
    value: { type: [Number, String], required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true }
  },
  computed: {
    to: getFilteredGameBrowseUrl
  }
}
</script>
