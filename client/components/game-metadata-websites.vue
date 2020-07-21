<template>
  <ol :class="listClass">
    <li v-for="(website, i) in sortedWebsites" :key="website.url" :class="itemClass">
      <meta v-if="i === 0" :content="website.url" itemprop="url">
      <a :href="website.url" class="no-style-link" itemprop="sameAs">{{
        getWebsiteCategoryName(website)
      }}</a>
    </li>
  </ol>
</template>

<script>
import { sortBy, startCase } from 'lodash'

const WEBSITE_CATEGORY = require('../../common/configs/igdb-enum-fields.json')
  .WEBSITE_CATEGORY

export default {
  props: {
    listClass: { type: String, default: '' },
    itemClass: { type: String, default: '' },
    websites: { type: Array, required: true }
  },
  computed: {
    sortedWebsites() {
      return sortBy(this.websites, 'category')
    }
  },
  methods: {
    getWebsiteCategoryName(website) {
      return startCase(WEBSITE_CATEGORY[website.category])
    }
  }
}
</script>
