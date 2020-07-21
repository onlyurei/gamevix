<template>
  <dl class="metadata mt-2">
    <template v-if="releaseDates && releaseDates.length">
      <dt>Release Dates</dt>
      <dd>
        <ol>
          <li v-for="(item, i) in releaseDates" :key="i">
            <time :datetime="item.date">
              {{ new Date(item.date).toLocaleDateString() }}
            </time>
            -
            <a v-if="item.platform" :href="item.platform.website" class="no-style-link">
              {{ item.platform.name }}
            </a>
          </li>
        </ol>
      </dd>
    </template>
    <game-metadata
      :entity="game.developers"
      :limit="10"
      name="Developers"
      field="developers"
    />
    <game-metadata
      :entity="game.publishers"
      :limit="10"
      name="Publishers"
      field="publishers"
    />
    <game-metadata :entity="collection" name="Collection" field="collection" />
    <game-metadata :entity="franchise" name="Franchise" field="franchise" />
    <game-metadata :entity="game.genres" :limit="10" name="Genres" field="genres" />
    <game-metadata :entity="game.themes" :limit="10" name="Themes" field="themes" />
    <game-metadata :entity="game.keywords" :limit="20" name="Keywords" field="keywords" />
  </dl>
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'
import GameMetadata from '../../../game-metadata.vue'

export default {
  components: {
    GameMetadata
  },
  mixins: [igdbGame]
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
dt
  margin-top 10px
ol
  list-style-type none
  padding 0
</style>
