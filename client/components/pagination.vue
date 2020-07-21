<template>
  <div v-if="length > 1" class="text-xs-center mt-5">
    <v-pagination v-model="page" v-bind="{ length, totalVisible, circle }" />
  </div>
</template>

<script>
import { pagination, params } from '../utils/mixins/pagination'

const { limit, maxOffset } = params

export default {
  mixins: [pagination],
  props: {
    limit: { type: Number, default: limit },
    maxOffset: { type: Number, default: maxOffset },
    totalVisible: { type: Number, default: null },
    circle: { type: Boolean, default: false }
  }
}
</script>
