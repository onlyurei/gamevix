<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="siteDrawer"
      :width="220"
      app
      clipped
      floating
      hide-overlay
      fixed
      disable-route-watcher
    >
      <site-drawer @navigate="$vuetify.breakpoint.mdAndDown && (siteDrawer = false)" />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="memberDrawer"
      :width="220"
      app
      clipped
      floating
      right
      hide-overlay
      fixed
      disable-resize-watcher
      disable-route-watcher
    >
      <member-drawer @navigate="memberDrawer = false" />
    </v-navigation-drawer>
    <v-toolbar app dense fixed clipped-left clipped-right>
      <v-toolbar-side-icon @click.native.stop="siteDrawer = !siteDrawer" />
      <nuxt-link to="/" title="Home" class="no-style-link hidden-xs-only">
        <v-toolbar-title itemscope itemtype="http://schema.org/Corporation">
          <meta itemprop="name" content="GameVix">
          <meta :content="`${host.origin}/`" itemprop="url">
          <meta :content="`${host.origin}/logo.png`" itemprop="logo">
          <img
            src="~/assets/img/logos/logo-full-light.svg"
            alt="GameVix Logo"
            height="24"
          >
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer />
      <search-bar />
      <v-avatar
        v-ripple="true"
        :color="passport ? 'primary' : 'secondary'"
        size="32px"
        class="no-style-link"
        @click.stop="memberDrawer = !memberDrawer"
      >
        <span v-if="displayName"><span class="headline">{{ initial }}</span></span>
        <v-icon v-else>
          account_circle
        </v-icon>
      </v-avatar>
    </v-toolbar>
    <v-content :class="$route.name" class="main">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <span class="ml-3">&copy; {{ `${new Date().getFullYear()} GameVix` }}</span>
    </v-footer>
    <page-back-fab />
  </v-app>
</template>

<script>
import host from '../../common/configs/host'
import MemberDrawer from '../components/layouts/member-drawer.vue'
import SiteDrawer from '../components/layouts/site-drawer.vue'
import SearchBar from '../components/search-bar.vue'
import PageBackFab from '../components/page-back-fab.vue'
import passport from '../utils/mixins/passport'

export default {
  components: {
    MemberDrawer,
    SiteDrawer,
    SearchBar,
    PageBackFab
  },
  mixins: [passport],
  data() {
    return {
      siteDrawer: null,
      memberDrawer: false,
      title: 'GameVix',
      host
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
#app
  >
  .toolbar
    .toolbar__title
      display flex
      align-content center
      margin-left 0
    .avatar
      margin 3px 12px 0
  .footer
    position relative
    z-index 3
</style>
