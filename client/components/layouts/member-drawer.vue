<template>
  <v-list>
    <v-list-tile class="hidden-sm-and-up">
      <img src="~/assets/img/logos/logo-full-light.svg" alt="GameVix Logo" height="24">
    </v-list-tile>
    <template v-if="displayName">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Hello {{ displayName }}!</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
    </template>
    <template v-for="(item, itemIndex) in memberSections">
      <template v-if="item.only || item.only === undefined">
        <v-list-tile
          v-if="item.to"
          :key="itemIndex"
          :to="item.to"
          router
          nuxt
          @click.native.stop="$emit('navigate')"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-else-if="item.divider" :key="itemIndex" />
      </template>
    </template>
  </v-list>
</template>

<script>
import passport from '../../utils/mixins/passport'

export default {
  mixins: [passport],
  computed: {
    memberSections() {
      return [
        {
          icon: 'person',
          title: 'Sign In',
          to: `/login${this.loginRedirectQueryParam}`,
          only: !this.passport
        },
        {
          icon: 'person_add',
          title: 'Sign Up',
          to: `/signup${this.loginRedirectQueryParam}`,
          only: !this.passport
        },
        {
          divider: true,
          only: !this.passport
        },
        {
          icon: 'swap_horiz',
          title: 'Your Games',
          to: '/member/account#games'
        },
        {
          icon: 'videogame_asset',
          title: 'Your Consoles',
          to: '/member/account#consoles'
        },
        {
          icon: 'perm_contact_calendar',
          title: 'Your Profile',
          to: '/member/account#profile'
        },
        {
          divider: true,
          only: this.passport
        },
        {
          icon: 'exit_to_app',
          title: 'Sign Out',
          to: '/logout',
          only: this.passport
        }
      ]
    }
  }
}
</script>
