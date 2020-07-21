<template>
  <v-layout v-if="show" id="videos" row wrap mt-5>
    <v-flex xs12 class="py-0">
      <h2>
        <a href="#videos" class="no-style-link">Trailers and Videos</a>
      </h2>
    </v-flex>
    <v-flex v-for="video in game.videos" :key="video.video_id" xs12 sm12 md6 lg6 xl6>
      <div
        :itemprop="
          `${video.name}`.toLowerCase().includes('trailer') ? 'trailer' : 'video'
        "
        itemscope
        itemtype="http://schema.org/VideoObject"
      >
        <span itemprop="name" class="sr-only">{{ video.name }}</span>
        <meta
          :content="`https://www.youtube.com/embed/${video.video_id}`"
          itemprop="embedUrl"
        >
        <meta :content="`https://youtu.be/${video.video_id}`" itemprop="url">
      </div>
      <no-ssr>
        <lazy-component>
          <youtube
            :video-id="video.video_id"
            :player-height="videoHeight"
            player-width="100%"
          />
        </lazy-component>
      </no-ssr>
    </v-flex>
  </v-layout>
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'

export default {
  mixins: [igdbGame],
  computed: {
    show() {
      const show = this.game.videos && this.game.videos.length
      if (show) {
        this.$emit('show')
      }
      return show
    }
  }
}
</script>
