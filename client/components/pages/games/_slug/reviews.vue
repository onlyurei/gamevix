<template>
  <div v-if="show" id="reviews" class="reviews mt-5">
    <h2 class="mb-1">
      <a href="#reviews" class="no-style-link">Reviews</a>
    </h2>
    <ol class="browser-list--unstyled">
      <li
        v-for="review in sortedReviews"
        :key="review.id"
        itemprop="review"
        itemscope
        itemtype="http://schema.org/Review"
        class="pt-4 pb-1"
      >
        <div class="mb-2">
          <v-avatar color="grey darken-2" size="30">
            <v-icon>person</v-icon>
          </v-avatar>
          <span
            class="body-2 ml-2"
            itemprop="author"
            itemscope
            itemtype="http://schema.org/Person"
          ><span itemprop="name">{{ review.username }}</span></span>
          <time class="caption ml-3" itemprop="datePublished">
            {{ new Date(review.updated_at).toLocaleDateString() }}
          </time>
        </div>
        <div
          :style="{ backgroundColor: `rgba(${backgroundRGB},${backgroundAlpha})` }"
          class="pa-3 mb-2"
          itemprop="reviewBody"
        >
          <div v-if="review.introduction" class="section">
            <h3>Introduction<span class="sr-only">: </span></h3>
            <p class="review-text break-word">
              {{ review.introduction }}
            </p>
          </div>
          <div v-if="review.content" class="section">
            <h3 v-if="review.introduction || review.conclusion">
              Review<span class="sr-only">: </span>
            </h3>
            <p class="review-text break-word">
              {{ review.content }}
            </p>
          </div>
          <div v-if="review.conclusion" class="section">
            <h3>Conclusion<span class="sr-only">: </span></h3>
            <p class="review-text break-word">
              {{ review.conclusion }}
            </p>
          </div>
          <div v-if="review.positive_points" class="section">
            <h3>Pros<span class="sr-only">: </span></h3>
            <p class="review-text break-word">
              {{ review.positive_points }}
            </p>
          </div>
          <div v-if="review.negative_points" class="section">
            <h3>Cons<span class="sr-only">: </span></h3>
            <p class="review-text break-word">
              {{ review.negative_points }}
            </p>
          </div>
        </div>
        <div v-if="review.likes" class="pb-3">
          <v-icon size="16px">
            thumb_up
          </v-icon>
          {{ review.likes }}
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import igdbGame from '../../../../utils/mixins/igdb-game'

export default {
  mixins: [igdbGame],
  computed: {
    show() {
      const show = this.reviews.length
      if (show) {
        this.$emit('show')
      }
      return show
    },
    sortedReviews() {
      return sortBy(this.reviews.slice(), ['likes', 'views']).reverse()
    }
  }
}
</script>

<style lang="stylus">
.review-text
  font-size 16px
.section:last-of-type
  .review-text
    margin-bottom 0
</style>
