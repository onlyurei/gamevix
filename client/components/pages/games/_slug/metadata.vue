<template>
  <dl class="mt-3 mb-3">
    <template v-if="game.first_release_date">
      <dt class="caption-lg">
        First Release Date
      </dt>
      <dd class="title">
        <time :datetime="game.first_release_date" v-html="releaseDateHighlighter(game)" />
      </dd>
    </template>
    <div v-if="status" class="mt-3">
      <dt class="d-inline-block">
        Status:
      </dt>
      &nbsp;
      <dd class="d-inline-block">
        {{ status }}
      </dd>
    </div>
    <div v-if="publisher.website && publisher.name" class="mt-2">
      <dt class="sr-only">
        Publisher
      </dt>
      <dd
        v-if="publisher.website"
        itemprop="publisher"
        itemscope
        itemtype="http://schema.org/Corporation"
        class="title"
      >
        <a :href="publisher.website" class="no-style-link">
          <meta :content="publisher.website" itemprop="url">
          <span itemprop="name">{{ publisher.name }}</span>
        </a>
      </dd>
    </div>
    <div v-if="game.websites && game.websites.length" class="mt-2">
      <dt class="d-inline-block">
        Websites:
      </dt>
      &nbsp;
      <game-metadata-websites
        :websites="game.websites"
        list-class="pl-0 csv"
        item-class="d-inline-block mr-2"
        class="d-inline-block"
      />
    </div>
    <div v-if="alternativeNames.length">
      <dt class="d-inline-block">
        Other Names:
      </dt>
      &nbsp;
      <dd class="d-inline-block csv">
        <span v-for="(item, i) in alternativeNames" :key="i">{{ item.name }} ({{ item.comment }})<meta
          :content="item.name"
          itemprop="alternateName"
        ></span>
      </dd>
    </div>
    <dt class="sr-only">
      Genre
    </dt>
    <dd class="mt-3 csv">
      <games-filter-link
        v-if="genre"
        :value="genre.id"
        :slug="genre.slug"
        :name="genre.name"
        field="genres"
        postfix="eq"
      >
        <span itemprop="genre">{{ genre.name }}</span>
      </games-filter-link>
      <games-filter-link
        v-if="theme"
        :value="theme.id"
        :slug="theme.slug"
        :name="theme.name"
        field="themes"
        postfix="eq"
      >
        <span itemprop="genre">{{ theme.name }}</span>
      </games-filter-link>
    </dd>
    <div v-if="platforms.length">
      <dt class="d-inline-block">
        Platforms:
      </dt>
      &nbsp;
      <dd class="d-inline-block csv">
        <games-filter-link
          v-for="(item, i) in platforms"
          :key="i"
          :value="item.id"
          :slug="item.slug"
          :name="item.name"
          field="release_dates.platform"
          postfix="eq"
        >
          <span itemprop="gamePlatform">{{ item.name }}</span>
          <meta :content="item.name" itemprop="operatingSystem">
        </games-filter-link>
      </dd>
    </div>
  </dl>
</template>

<script>
const igdbEnumFields = require('../../../../../common/configs/igdb-enum-fields.json')

import highlighters from '../../../../utils/mixins/game-card-highlighters'
import igdbGame from '../../../../utils/mixins/igdb-game'
import GameMetadataWebsites from '../../../game-metadata-websites.vue'
import GamesFilterLink from '../../../games-filter-link.vue'

export default {
  components: {
    GamesFilterLink,
    GameMetadataWebsites
  },
  mixins: [igdbGame, highlighters],
  computed: {
    status() {
      return igdbEnumFields.GAME_STATUS[this.game.status]
    },
    alternativeNames() {
      if (Array.isArray(this.game.alternative_names)) {
        return this.game.alternative_names.filter(
          item =>
            typeof item.comment === 'string' &&
            item.comment.toLowerCase().trim() !== 'other'
        )
      }
      return []
    },
    publisher() {
      return (this.game.publishers && this.game.publishers[0]) || {}
    }
  }
}
</script>
