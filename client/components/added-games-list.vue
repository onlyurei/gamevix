<template>
  <div v-if="supportedPlatforms.length" class="added-games-list">
    <div v-if="loggedIn" class="px-2">
      <div class="subheading mb-1">
        Version(s) of this game
        <nuxt-link :to="`/member/account#games`">
          you own:
        </nuxt-link>
      </div>
      <ol>
        <li
          v-for="platform in supportedPlatforms"
          :key="platform.id"
          class="grey lighten-2 card--hover"
          @click="toggleGameVersion(platform.id)"
        >
          <v-icon v-if="isGameVersionOwned(platform.id)" color="primary">
            check_box
          </v-icon>
          <v-icon v-else color="grey darken-2">
            check_box_outline_blank
          </v-icon>&nbsp;
          <img
            :src="getPlatformLogoSrc(platform.slug)"
            :alt="platform.name"
            class="logo"
          >
        </li>
      </ol>
    </div>
    <div v-else class="text-xs-center">
      <div class="title">
        Do you own this game?
      </div>
      <v-btn
        :to="`/login${loginRedirectQueryParam}`"
        color="primary"
        small
        nuxt
        class="mt-3 mx-0"
      >
        Swap It for A New Game
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import supportedPlatforms from '../../common/configs/platforms.json'
import igdb from '../utils/mixins/igdb'
import passport from '../utils/mixins/passport'

export default {
  mixins: [igdb, passport],
  props: {
    releaseDates: { type: Array, default: () => [] },
    gameId: { type: [String, Number], required: true }
  },
  computed: {
    ...mapState('member_account', ['games']),
    loggedIn() {
      return !!this.$store.state.passport
    },
    supportedPlatforms() {
      const now = new Date()
      return [
        ...new Set(
          this.releaseDates
            .filter(
              releaseDate =>
                releaseDate.date < now &&
                releaseDate.platform &&
                supportedPlatforms.find(
                  supportedPlatform =>
                    supportedPlatform.igdbId === releaseDate.platform.id
                )
            )
            .map(releaseDate => releaseDate.platform)
        )
      ]
    },
    ownedGameVersions() {
      return this.games.filter(game => game.igdbId === this.gameId)
    }
  },
  async beforeMount() {
    if (this.loggedIn) {
      this.$store.dispatch('member_account/getGames', {
        id: this.$store.state.passport.id
      })
    }
  },
  methods: {
    isGameVersionOwned(igdbPlatformId) {
      return this.ownedGameVersions.find(game => game.platform.igdbId === igdbPlatformId)
    },
    toggleGameVersion(igdbPlatformId) {
      if (this.isGameVersionOwned(igdbPlatformId)) {
        this.$store.dispatch('member_account/removeGame', {
          id: this.$store.state.passport.id,
          gameId: this.ownedGameVersions.find(
            game => game.platform.igdbId === igdbPlatformId
          ).id
        })
      } else {
        this.$store.dispatch('member_account/addGame', {
          id: this.$store.state.passport.id,
          igdbGameId: this.gameId,
          igdbPlatformId
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>

.added-games-list
  padding 10px 0
  border 2px dashed #fff
  border-radius 10px

.subheading
  font-weight 600

ol
  list-style-type none
  padding 0
  margin 0
  display flex
  flex-wrap wrap

  li
    display flex
    align-items center
    cursor pointer
    margin 5px 10px 5px 0
    padding 3px
    border-radius 8px

.logo
  width auto
  height 20px
</style>
