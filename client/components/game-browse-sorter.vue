<template>
  <v-select v-model="order" v-bind="{ items }" label="Sort By" />
</template>

<script>
import items from '../../common/configs/igdb-game-browse-orders'

export default {
  data() {
    return {
      order: this.$route.query.order,
      items
    }
  },
  watch: {
    order() {
      const query = { ...this.$route.query, order: this.order }
      if (!query.order) {
        delete query.order
      }
      this.$router.push({ query })
    }
  }
}
</script>
