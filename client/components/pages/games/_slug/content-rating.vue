<template>
  <div v-if="rating" class="mt-3">
    <meta :content="`${rater.toUpperCase()} ${rating.name}`" itemprop="contentRating">
    <dt class="mb-1">
      <a :href="raterUrl" class="no-style-link">{{ rater.toUpperCase() }}</a> Rating
    </dt>
    <dd>
      <v-layout row wrap>
        <v-flex xs4>
          <img :src="rating.src" :alt="rating.name" width="100%">
        </v-flex>
        <v-flex xs8 definition>
          <h3>{{ rating.definition.name }}</h3>
          <p>{{ rating.definition.description }}</p>
        </v-flex>
      </v-layout>
    </dd>
  </div>
</template>

<script>
const igdbEnumFields = require('../../../../../common/configs/igdb-enum-fields.json')

export default {
  props: {
    ratingValue: { type: String, default: null },
    rater: { type: String, required: true },
    raterUrl: { type: String, required: true },
    definitions: { type: Object, required: true }
  },
  computed: {
    rating() {
      if (this.ratingValue) {
        const name =
          igdbEnumFields[`${this.rater.toUpperCase()}_RATING`][this.ratingValue]
        return {
          name,
          definition: this.definitions[name],
          src: require(`~/assets/img/logos/${this.rater}/${name.toLowerCase()}.svg`)
        }
      }
      return null
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
.definition
  h3
  p
    line-height 1.28
    margin-bottom 2px
</style>
