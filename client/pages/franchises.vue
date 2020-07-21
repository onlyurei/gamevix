<template>
  <entities v-bind="{ entitiesName }" field="franchise" text-color="accent" />
</template>

<script>
import entities from '../utils/mixins/entities'

const data = { entitiesName: 'franchises' }

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
