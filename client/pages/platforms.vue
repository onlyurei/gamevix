<template>
  <entities v-bind="{ entitiesName }" field="release_dates.platform" text-color="error" />
</template>

<script>
import entities from '../utils/mixins/entities'

const data = { entitiesName: 'platforms' }

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
