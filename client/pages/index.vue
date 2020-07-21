<template>
  <v-container fluid class="no-padding">
    <hero-jumbotron />
    <how-it-works />
    <pricing-info />
    <supported-platforms />
    <new-games />
  </v-container>
</template>

<script>
import host from '../../common/configs/host'
import { description } from '../../package'
import HeroJumbotron from '../components/pages/index/hero-jumbotron.vue'
import HowItWorks from '../components/pages/index/how-it-works.vue'
import NewGames from '../components/pages/index/new-games.vue'
import PricingInfo from '../components/pages/index/pricing-info.vue'
import SupportedPlatforms from '../components/pages/index/supported-platforms.vue'

export default {
  components: {
    HeroJumbotron,
    HowItWorks,
    PricingInfo,
    NewGames,
    SupportedPlatforms
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('games_browse/getRecentlyReleased'),
      store.dispatch('games_browse/getToBeReleased'),
      store.dispatch('games_browse/getMostAnticipated'),
      store.dispatch('games_browse/getPopular'),
      store.dispatch('games_browse/getBestRated')
    ])
  },
  head() {
    const link = []
    link.push({
      rel: 'canonical',
      href: `${host.origin}/`
    })
    return {
      title: 'GameVix: Swap Video Games - Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ],
      link
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
.main.index
  > .content--wrap
    > .container
      padding 0
</style>
