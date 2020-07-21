<template>
  <content-rating
    v-bind="{ definitions }"
    :rating-value="game.esrb && String(game.esrb.rating)"
    rater="esrb"
    rater-url="http://www.esrb.org/"
  />
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'
import ContentRating from './content-rating.vue'

const definitions = {
  EC: {
    name: 'EARLY CHILDHOOD',
    description: 'Content is intended for young children.'
  },
  E: {
    name: 'EVERYONE',
    description:
      'Content is generally suitable for all ages. May contain minimal ' +
      'cartoon, fantasy or mild violence and/or infrequent use of mild ' +
      'language.'
  },
  'E10+': {
    name: 'EVERYONE 10+',
    description:
      'Content is generally suitable for ages 10 and up. May contain more ' +
      'cartoon, fantasy or mild violence, mild language and/or minimal ' +
      'suggestive themes.'
  },
  T: {
    name: 'TEEN',
    description:
      'Content is generally suitable for ages 13 and up. May contain ' +
      'violence, suggestive themes, crude humor, minimal blood, simulated ' +
      'gambling and/or infrequent use of strong language.'
  },
  M: {
    name: 'MATURE',
    description:
      'Content is generally suitable for ages 17 and up. May contain ' +
      'intense violence, blood and gore, sexual content and/or strong ' +
      'language.'
  },
  AO: {
    name: 'ADULTS ONLY',
    description:
      'Content suitable only for adults ages 18 and up. May include ' +
      'prolonged scenes of intense violence, graphic sexual content and/or' +
      ' gambling with real currency.'
  },
  RP: {
    name: 'RATING PENDING',
    description: 'Not yet assigned a final ESRB rating.'
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
