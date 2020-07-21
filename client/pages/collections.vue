<template>
  <entities v-bind="{ entitiesName }" field="collection" text-color="info" />
</template>

<script>
import entities from '../utils/mixins/entities'

const data = { entitiesName: 'collections' }

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
