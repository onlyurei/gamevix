<template>
  <div class="hero-jumbotron-container">
    <game-images-mosaic
      v-bind="{ gameGroupsOfTwo }"
      height="500px"
      class="game-images-mosaic"
    />
    <v-jumbotron color="transparent" height="500px" class="hero-jumbotron">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h1>GameVix: Swap Video Games</h1>
            <span class="subheading">
              Spend much LESS 💰 , play much MOAR 🎮 !
            </span>
            <v-divider class="my-3" />
            <div class="title">
              Swap your used video game discs with others, hassle free.
            </div>
            <v-btn
              color="primary"
              class="mt-4 mx-0"
              large
              nuxt
              to="/member/account?utm_medium=home-jumbotron#games"
            >
              Swap Your Games
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
</template>

<script>
import { chunk } from 'lodash'
import { mapState } from 'vuex'
import GameImagesMosaic from '../../game-images-mosaic.vue'

export default {
  components: { GameImagesMosaic },
  computed: {
    ...mapState('games_browse', [
      'recentlyReleased',
      'toBeReleased',
      'mostAnticipated',
      'popular',
      'bestRated'
    ]),
    gameGroupsOfTwo() {
      const games = [
        ...(this.bestRated || []),
        ...(this.popular || []),
        ...(this.mostAnticipated || []),
        ...(this.toBeReleased || []),
        ...(this.recentlyReleased || [])
      ]
      return chunk(games, 2)
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.hero-jumbotron-container
  position relative
  .hero-jumbotron
    position absolute
    background linear-gradient(to bottom, rgba(0, 0, 0, .85), rgba(0, 0, 0, .15))
    text-shadow: 3px 1px 3px #000
    .btn
      text-shadow none
</style>
