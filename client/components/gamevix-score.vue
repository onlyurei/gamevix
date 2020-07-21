<template>
  <div itemprop="review" itemscope itemtype="http://schema.org/Review">
    <div itemprop="author" itemscope itemtype="http://schema.org/Corporation">
      <meta itemprop="name" content="GameVix">
      <meta :content="`${host.origin}/`" itemprop="url">
      <meta :content="`${host.origin}/logo.png`" itemprop="logo">
    </div>
    <div
      :class="{ small }"
      class="text"
      itemprop="reviewRating"
      itemscope
      itemtype="http://schema.org/Rating"
    >
      <meta itemprop="worstRating" content="1">
      <img src="/favicon-32x32.png" class="gamevix-score-logo" height="16" alt="">
      GameVix Score:
      <span :class="{ good }" itemprop="ratingValue">{{ Math.round(score) }}</span>%
      <meta itemprop="bestRating" content="100">
    </div>
  </div>
</template>

<script>
import host from '../../common/configs/host'
import { getGameMarketScores } from '../../common/igdb'

const goodScore = 65

export default {
  props: {
    game: { type: Object, required: true },
    small: { type: Boolean, default: false }
  },
  data() {
    return {
      host
    }
  },
  computed: {
    score() {
      return getGameMarketScores(this.game).score
    },
    good() {
      return this.score >= goodScore
    }
  }
}
</script>

<style lang="stylus" scoped>
.gamevix-score-logo
  position relative
  top 3px

.text
  font-size 15px

.good
  font-weight 700
  font-size 18px
  line-height 1

.small
  &.text
    font-size 13px
  .good
    font-size 16px
</style>
