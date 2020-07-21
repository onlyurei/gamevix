<template>
  <div v-if="entity && (entity.name || entity.length)" class="metadata">
    <dt>{{ name }}</dt>
    <dd v-if="Array.isArray(entity) && entity.length">
      <ol>
        <li
          v-for="(item, i) in limit ? take(entity, limit) : entity"
          v-if="item && item.name"
          :key="i"
        >
          <game-filter-link
            :field="field"
            :value="item.id"
            :slug="item.slug"
            :name="item.name"
            postfix="eq"
          >
            {{ item.name }}
          </game-filter-link>
        </li>
      </ol>
    </dd>
    <dd v-else-if="entity.name">
      <game-filter-link
        :field="field"
        :value="entity.id"
        :slug="entity.slug"
        :name="entity.name"
        postfix="eq"
      >
        {{ entity.name }}
      </game-filter-link>
    </dd>
  </div>
</template>

<script>
import { take } from 'lodash'
import GameFilterLink from './games-filter-link.vue'

export default {
  components: {
    GameFilterLink
  },
  props: {
    entity: { type: [Object, Array, Number, String], default: null },
    name: { type: String, required: true },
    field: { type: String, required: true },
    limit: { type: Number, default: 0 }
  },
  methods: { take }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.metadata
  dt
    margin-top 10px
    font-weight 600
  ol
    list-style-type none
    padding 0
</style>
