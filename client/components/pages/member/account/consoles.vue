<template>
  <v-container grid-list-md class="no-padding">
    <h2 class="mt-4 mb-2 headline">
      Swap for Games on Consoles
    </h2>
    <v-layout row wrap>
      <v-flex v-for="platform in platforms" :key="platform.igdbId" xs6 md4 lg3>
        <v-card
          height="200px"
          hover
          color="grey lighten-2"
          class="grey--text text--darken-4"
          @click.native="toggleOwnedPlatform(platform)"
        >
          <v-card-media-custom :src="getPlatformLogoSrc(platform.slug)" height="145px" />
          <v-card-title primary-title>
            <v-icon v-if="isPlatformOwned(platform)" color="primary">
              check_box
            </v-icon>
            <v-icon v-else color="grey darken-4">
              check_box_outline_blank
            </v-icon>
            {{ platform.name }}
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <h2 class="mt-4 mb-1 headline">
      Consoles Selected ({{ ownedPlatforms.length }})
    </h2>
    <div v-if="ownedPlatforms.length" class="csv">
      <span
        v-for="platform in platforms"
        v-if="isPlatformOwned(platform)"
        :key="platform.igdbId"
      >{{ platform.name }}</span>
    </div>
    <span v-else>None</span>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import igdb from '../../../../utils/mixins/igdb'

export default {
  mixins: [igdb],
  computed: {
    ...mapState('member_account', ['platforms', 'ownedPlatforms']),
    hash() {
      return this.$route.hash
    }
  },
  watch: {
    hash(hash) {
      if (hash === '#consoles') {
        this.fetch()
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$store.dispatch('member_account/getOwnedPlatforms', {
        id: this.$store.state.passport.id
      })
    },
    isPlatformOwned(platform) {
      return !!this.ownedPlatforms.find(
        ownedPlatform => ownedPlatform.igdbId === platform.igdbId
      )
    },
    toggleOwnedPlatform(platform) {
      if (!this.isPlatformOwned(platform)) {
        this.$store.dispatch('member_account/addOwnedPlatform', {
          id: this.$store.state.passport.id,
          platform
        })
      } else {
        this.$store.dispatch('member_account/removeOwnedPlatform', {
          id: this.$store.state.passport.id,
          ownedPlatformId: this.ownedPlatforms.find(
            ownedPlatform => ownedPlatform.igdbId === platform.igdbId
          ).id
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.card__title
  display block
  width 100%
  text-align center
  font-size 18px
  line-height 1.28
  padding-top 5px
</style>

<style rel="stylesheet/stylus" lang="stylus">
.main.member-account
  .card__media__background.img
    img
      width 65%
      height auto
      margin-left auto
      margin-right auto
</style>
