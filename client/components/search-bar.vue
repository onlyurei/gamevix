<template>
  <v-layout class="search-bar">
    <v-flex xs11>
      <div :itemscope="isHome" :itemtype="isHome ? 'http://schema.org/WebSite' : null">
        <meta v-if="isHome" :content="`${host.origin}/`" itemprop="url">
        <form
          :itemprop="isHome ? 'potentialAction' : null"
          :itemscope="isHome"
          :itemtype="isHome ? 'http://schema.org/SearchAction' : null"
          action="/search"
          autocomplete="off"
          @submit.prevent="submit"
        >
          <meta
            v-if="isHome"
            :content="`${host.origin}/search?q={q}`"
            itemprop="target"
          >
          <v-text-field
            v-model.trim="q"
            :itemprop="isHome ? 'query-input' : null"
            name="q"
            dark
            hide-details
            single-line
            clearable
            label="Search Games..."
          />
        </form>
      </div>
    </v-flex>
    <v-flex xs1 class="text-xs-left progress">
      <v-icon @click="submit">
        search
      </v-icon>
    </v-flex>
  </v-layout>
</template>

<script>
import host from '../../common/configs/host'

export default {
  data() {
    return {
      q: this.$route.path === '/search' ? this.$route.query.q : '',
      host
    }
  },
  computed: {
    isHome() {
      return this.$route.path === '/'
    }
  },
  methods: {
    submit() {
      if (this.q) {
        this.$router.push({ path: '/search', query: { q: this.q } })
      }
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.search-bar
  .progress
    margin-top 4px
    .icon
      font-size 27px
      cursor pointer
      &:hover
      &:focus
        color #19a1ff
</style>
