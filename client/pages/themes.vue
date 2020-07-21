<template>
  <entities v-bind="{ entitiesName }" field="themes" text-color="primary" />
</template>

<script>
import entities from '../utils/mixins/entities'

const data = { entitiesName: 'themes' }

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
