<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg10 xl8 offset-lg1 offset-xl2>
        <h1>Account</h1>
        <v-tabs
          :value="tabId"
          slider-color="orange darken-2"
          fixed-tabs
          centered
          @input="onTabIdChange"
        >
          <v-tab href="#games">
            Games
          </v-tab>
          <v-tab href="#consoles">
            Consoles
          </v-tab>
          <v-tab href="#profile">
            Profile
          </v-tab>
          <v-tabs-items touchless>
            <v-tab-item id="games" lazy>
              <games />
            </v-tab-item>
            <v-tab-item id="consoles" lazy>
              <consoles />
            </v-tab-item>
            <v-tab-item id="profile" lazy>
              <profile />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Consoles from '../../components/pages/member/account/consoles.vue'
import Games from '../../components/pages/member/account/games/index.vue'
import Profile from '../../components/pages/member/account/profile/index.vue'

export default {
  components: {
    Games,
    Consoles,
    Profile
  },
  head() {
    return {
      title: 'Account'
    }
  },
  computed: {
    ...mapState('member_account', ['tabId'])
  },
  watch: {
    $route: 'setTabIdFromRouteHash'
  },
  beforeMount() {
    this.setTabIdFromRouteHash()
    setTimeout(() => this.$router.replace({ hash: '' }), 100)
    this.$store.dispatch('member_account/getAddress', {
      id: this.$store.state.passport.id
    })
  },
  methods: {
    ...mapMutations('member_account', ['SET_TAB_ID']),
    setTabIdFromRouteHash() {
      this.SET_TAB_ID(this.$route.hash.replace('#', ''))
    },
    onTabIdChange(tabId) {
      if (tabId === 'games') {
        Games.methods.fetch.call(this)
      }
      this.SET_TAB_ID(tabId)
    }
  },
  middleware: 'passport'
}
</script>
