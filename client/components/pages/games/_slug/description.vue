<template>
  <div
    v-if="show"
    id="story"
    :style="{ backgroundColor: `rgba(${backgroundRGB},${backgroundAlpha})` }"
    class="pa-3 description"
  >
    <h2 class="sr-only">
      Summary, Storyline, ESRB/PEGI Synopsis
    </h2>
    <div v-if="summarizedFullDescription" class="part tldr">
      <h3>tl;dr</h3>
      <ul class="ml-3 mt-1">
        <li v-for="point in tldrPoints" :key="point">{{ point }}</li>
      </ul>
      <hr class="my-3">
    </div>
    <div class="part">{{ truncatedDescription }}</div>
    <template v-if="shouldToggleDescription">
      <span v-if="!showFullDescription">...</span>
      <div :class="{ 'sr-only': !showFullDescription }" class="part">
        {{ remainingDescription }}
      </div>
      <v-btn flat class="d-block ma-0" @click="toggleFullDescription">
        {{ showFullDescription ? 'Show Less' : 'Show More' }}
      </v-btn>
    </template>
    <meta :content="metaDescription" itemprop="description">
  </div>
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'

const truncatedDescriptionLength = 1500

export default {
  mixins: [igdbGame],
  data() {
    return { showFullDescription: false }
  },
  computed: {
    show() {
      const show = this.summary || this.storyline || this.synopsis
      if (show) {
        this.$emit('show')
      }
      return show
    },
    truncatedDescription() {
      return this.fullDescription.substr(0, truncatedDescriptionLength)
    },
    shouldToggleDescription() {
      return this.fullDescription.length > truncatedDescriptionLength
    },
    remainingDescription() {
      return this.shouldToggleDescription
        ? this.fullDescription.substr(truncatedDescriptionLength)
        : ''
    },
    tldrPoints() {
      return this.summarizedFullDescription
        .split('\n')
        .map(text =>
          text
            .replace(/\n/g, ' ')
            .replace(/ +/g, ' ')
            .trim()
        )
        .filter(text => text)
    }
  },
  methods: {
    toggleFullDescription() {
      this.showFullDescription = !this.showFullDescription
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.description
  font-size 17px
  font-weight 400
  white-space pre-wrap
  .part
    display inline
  .tldr
    font-size 16px
</style>
