<template>
  <content-rating
    v-bind="{ definitions }"
    :rating-value="game.pegi && String(game.pegi.rating)"
    rater="pegi"
    rater-url="http://www.pegi.info/"
  />
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'
import ContentRating from './content-rating.vue'

const definitions = {
  3: {
    name: 'PEGI 3',
    description: 'Suitable for persons 3 and older.'
  },
  7: {
    name: 'PEGI 7',
    description: 'Recommended for persons 7 and older.'
  },
  12: {
    name: 'PEGI 12',
    description: 'Suitable for persons 12 and older.'
  },
  16: {
    name: 'PEGI 16',
    description: 'Suitable for persons 16 and older.'
  },
  18: {
    name: 'PEGI 18',
    description: 'Only for persons 18 and older.'
  }
}

export default {
  components: { ContentRating },
  mixins: [igdbGame],
  data() {
    return {
      definitions
    }
  }
}
</script>
