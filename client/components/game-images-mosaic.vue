<template>
  <v-layout :style="{ height, overflow: 'hidden' }" row wrap>
    <v-flex v-for="(gameGroupOfTwo, i) in gameGroupsOfTwo" :key="i" xs2 xm1>
      <v-layout row wrap>
        <v-flex v-for="game in gameGroupOfTwo" :key="game.slug" xs12 sm12 md6>
          <lazy-component>
            <v-card-media :src="getGameImageSrc(game)" :height="imageHeight" />
          </lazy-component>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { getEntityMainImage } from '../../common/igdb'
import igdb from '../utils/mixins/igdb'

export default {
  mixins: [igdb],
  props: {
    gameGroupsOfTwo: { type: Array, required: true },
    height: { type: String, default: null },
    imageHeight: { type: String, default: '100px' },
    imageRendition: { type: String, default: 'cover_big' }
  },
  methods: {
    getGameImageSrc(game, retinal = false) {
      return this.getImageRendition(
        getEntityMainImage(game).url,
        this.imageRendition,
        retinal
      )
    }
  }
}
</script>
