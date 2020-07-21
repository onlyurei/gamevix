<template>
  <v-list>
    <template v-for="(item, itemIndex) in items">
      <v-list-group
        v-if="item.items"
        :key="itemIndex"
        :group="item.group"
        :prepend-icon="item.action"
      >
        <v-list-tile slot="activator" ripple>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(subItem, subItemIndex) in item.items"
          :key="`${itemIndex}${subItemIndex}`"
          :to="!subItem.target ? subItem.href : null"
          :href="subItem.target && subItem.href"
          :disabled="subItem.disabled"
          :target="subItem.target"
          ripple
          router
          nuxt
          exact
          @click.native.stop="$emit('navigate')"
        >
          <v-list-tile-action v-if="subItem.action">
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-subheader v-else-if="item.header" :key="itemIndex" dark>
        {{ item.header }}
      </v-subheader>
      <v-divider v-else-if="item.divider" :key="itemIndex" />
      <v-list-tile
        v-else
        :key="itemIndex"
        :to="!item.target ? item.href : null"
        :href="item.target && item.href"
        :disabled="item.disabled"
        :target="item.target"
        ripple
        router
        nuxt
        exact
        rel="noopener"
        @click.native.stop="$emit('navigate')"
      >
        <v-list-tile-action>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="item.subAction">
          <v-icon>{{ item.subAction }}</v-icon>
        </v-list-tile-action>
        <v-chip v-else-if="item.chip" small>
          {{ item.chip }}
        </v-chip>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { action: 'home', title: 'Home', href: '/' },
        { divider: true },
        { action: 'games', title: 'Games', href: '/games' },
        {
          action: 'fiber_new',
          title: 'Recently Released',
          href: '/games/browse/recently-released'
        },
        {
          action: 'new_releases',
          title: 'To Be Released',
          href: '/games/browse/to-be-released'
        },
        {
          action: 'favorite',
          title: 'Most Anticipated',
          href: '/games/browse/most-anticipated'
        },
        { action: 'whatshot', title: 'Popular', href: '/games/browse/popular' },
        {
          action: 'grade',
          title: 'Best Rated',
          href: '/games/browse/best-rated'
        },
        {
          action: 'layers',
          title: 'Browse By',
          group: '',
          items: [
            { action: 'bubble_chart', title: 'Genres', href: '/genres' },
            { action: 'palette', title: 'Themes', href: '/themes' },
            {
              action: 'videogame_asset',
              title: 'Platforms',
              href: '/platforms'
            },
            {
              action: 'branding_watermark',
              title: 'Franchises',
              href: '/franchises'
            },
            {
              action: 'collections',
              title: 'Collections',
              href: '/collections'
            },
            { action: 'vpn_key', title: 'Keywords', href: '/keywords' }
          ]
        },
        { divider: true },
        { action: 'subject', title: 'Game News', href: '/news' }
      ]
    }
  }
}
</script>
