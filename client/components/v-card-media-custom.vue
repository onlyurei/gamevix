<template>
  <div :style="{ height }" class="card__media">
    <div ref="imgContainer" class="card__media__background img">
      <template v-if="!extractImageColor || extractImageColorFailed">
        <img v-lazy="src" v-if="lazy" ref="img" v-bind="{ srcset, alt }">
        <img v-else ref="img" v-bind="{ src, srcset, alt }">
      </template>
      <span v-if="extractImageColor && lazy" class="error--text">
        <code>extractImageColor</code> and <code>lazy</code> cannot be set to
        <code>true</code> at same time
      </span>
    </div>
    <div class="card__media__content">
      <slot />
    </div>
  </div>
</template>

<script>
import * as Vibrant from 'node-vibrant'
import igdb from '../utils/mixins/igdb'

export default {
  mixins: [igdb],
  props: {
    src: { type: String, required: true },
    srcset: { type: String, default: '' },
    alt: { type: String, default: '' },
    height: { type: String, required: true },
    extractImageColor: { type: Boolean, default: false },
    preferredImageColorVariant: { type: String, default: '' },
    lazy: { type: Boolean, default: false }
  },
  data() {
    return { img: null, extractImageColorFailed: false }
  },
  mounted() {
    if (this.extractImageColor && !this.lazy) {
      try {
        const img = document.createElement('img')
        img.crossOrigin = 'Anonymous'
        img.addEventListener('load', async event => {
          const vibrant = new Vibrant(event.target)
          this.$emit(
            'image-rgb-color-extracted',
            this.getRGBColorFromPalette(
              await vibrant.getPalette(),
              this.preferredImageColorVariant
            )
          )
        })
        img.addEventListener('error', this.handleExtractImageColorFailure)
        //TODO remove after CORS is re-enabled on images.igdb.com
        const igdbImagesOriginRegex = /(http(s){0,1}:){0,1}\/\/images\.igdb\.com\//gi
        img.src = this.src.replace(igdbImagesOriginRegex, '/')
        img.srcset = this.srcset.replace(igdbImagesOriginRegex, '/')
        img.alt = this.alt
        this.img = img
        this.$refs.imgContainer.appendChild(img)
      } catch (e) {
        this.handleExtractImageColorFailure()
      }
    }
  },
  methods: {
    handleExtractImageColorFailure() {
      this.extractImageColorFailed = true
      if (this.$refs.imgContainer && this.img) {
        this.$refs.imgContainer.removeChild(this.img)
      }
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
.card__media__background.img
  display flex
  align-items center
</style>
