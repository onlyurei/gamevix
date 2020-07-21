<template>
  <div class="rating">
    <template v-if="!isNaN(fiveStarRating)">
      <star-rating :rating="fiveStarRating" :increment="0.1" :star-size="25" read-only />
      <div
        itemprop="aggregateRating"
        itemscope
        itemtype="http://schema.org/AggregateRating"
      >
        <meta :content="fiveStarRating" itemprop="ratingValue">
        <meta itemprop="worstRating" content="1">
        <meta itemprop="bestRating" content="5">
        <div>
          <span v-if="!isNaN(game.total_rating_count) && game.total_rating_count">
            <span itemprop="ratingCount">
              {{ game.total_rating_count.toLocaleString() }}</span>
            votes
          </span>
          <a v-if="reviews.length" href="#reviews" class="ml-2">
            <span itemprop="reviewCount">{{ reviews.length }}</span> reviews
          </a>
        </div>
      </div>
    </template>
    <gamevix-score v-bind="{ game }" class="mt-1" />
  </div>
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'
import igdbGameCommon from '../../../../utils/mixins/igdb-game-common'
import GamevixScore from '../../../gamevix-score.vue'

export default {
  components: {
    GamevixScore
  },
  mixins: [igdbGame, igdbGameCommon]
}
</script>
