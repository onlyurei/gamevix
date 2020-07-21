<template>
  <section class="igdb-entity-grid-list">
    <v-container fluid grid-list-xl class="no-padding">
      <v-layout row wrap>
        <v-flex v-for="entity in entities" :key="entity.id" xs12 sm6 md4 lg3 xl2>
          <igdb-entity-list-item :entity="entity" v-bind="$attrs" />
        </v-flex>
      </v-layout>
    </v-container>
    <div class="text-xs-right mt-0">
      <v-btn v-if="seeMoreLink" :to="seeMoreLink.to" flat router nuxt class="mx-0">
        {{ seeMoreLink.text }}
      </v-btn>
    </div>
  </section>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    entities: { type: Array, default: () => [] },
    seeMoreLink: {
      type: Object,
      default: null,
      validator: value => value.hasOwnProperty('to') && value.hasOwnProperty('text')
    }
  }
}
</script>
