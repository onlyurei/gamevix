<template>
  <entities v-bind="{ entitiesName }" field="genres" text-color="warning" />
</template>

<script>
import entities from '../utils/mixins/entities'

const data = { entitiesName: 'genres' }

export default {
  mixins: [entities],
  data() {
    return data
  },
  async fetch(...args) {
    await entities.methods.paginate.call(data, ...args)
  }
}
</script>
