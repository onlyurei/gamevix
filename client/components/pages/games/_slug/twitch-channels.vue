<template>
  <v-layout v-if="show" id="twitch" row wrap mt-5>
    <v-flex xs12 class="py-0">
      <h2>
        <a href="#twitch" class="no-style-link">Twitch Channels</a>
      </h2>
    </v-flex>
    <v-flex v-for="channel in channels" :key="channel._id" xs12 sm12 md6 lg6 xl6>
      <div itemprop="video" itemscope itemtype="http://schema.org/VideoObject">
        <span itemprop="name" class="sr-only">{{ channel.display_name }}</span>
        <meta :content="channel.status" itemprop="description">
        <meta :content="channel.updated_at" itemprop="uploadDate">
        <meta
          :content="`https://player.twitch.tv/?channel=${channel.name}`"
          itemprop="embedUrl"
        >
        <meta :content="channel.url" itemprop="url">
        <meta
          :content="channel.video_banner || channel.profile_banner || channel.logo"
          itemprop="thumbnailUrl"
        >
        <meta :content="channel.language" itemprop="inLanguage">
      </div>
      <lazy-component>
        <iframe
          :src="
            `https://player.twitch.tv/?channel=${channel.name}&autoplay=false&muted=false`
          "
          :height="videoHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen
        />
      </lazy-component>
    </v-flex>
    <v-flex v-if="channel" xs12 sm12 md6 lg6 xl6>
      <lazy-component>
        <iframe
          :src="`https://player.twitch.tv/?channel=${channel}&autoplay=true&muted=true`"
          :height="videoHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen
        />
      </lazy-component>
    </v-flex>
    <v-flex v-for="video in videos" :key="video._id" xs12 sm12 md6 lg6 xl6>
      <div itemprop="video" itemscope itemtype="http://schema.org/VideoObject">
        <span itemprop="name" class="sr-only">{{ video.title }}</span>
        <meta :content="video.description" itemprop="description">
        <meta :content="video.published_at" itemprop="uploadDate">
        <meta
          :content="`https://player.twitch.tv/?video=${video._id}`"
          itemprop="embedUrl"
        >
        <meta :content="video.url" itemprop="url">
        <meta
          :content="
            video.thumbnails && video.thumbnails.length && video.thumbnails[0].url
          "
          itemprop="thumbnailUrl"
        >
        <meta :content="video.language" itemprop="inLanguage">
        <meta :content="`PT${video.length}S`" itemprop="duration">
      </div>
      <lazy-component>
        <iframe
          :src="`https://player.twitch.tv/?video=${video._id}&autoplay=false&muted=false`"
          :height="videoHeight"
          width="100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen
        />
      </lazy-component>
    </v-flex>
  </v-layout>
</template>

<script>
import { toPairs } from 'lodash'
import igdbGame from '../../../../utils/mixins/igdb-game'

const WEBSITE_CATEGORY = require('../../../../../common/configs/igdb-enum-fields.json')
  .WEBSITE_CATEGORY

const twitch = toPairs(WEBSITE_CATEGORY).find(pair => pair[1] === 'twitch')[0]
const apiBaseUrl = 'https://api.twitch.tv/kraken'

export default {
  mixins: [igdbGame],
  data() {
    return {
      channels: [],
      videos: []
    }
  },
  computed: {
    channel() {
      const twitchWebsite =
        this.game.websites &&
        this.game.websites.find(website => `${website.category}` === twitch)
      if (twitchWebsite) {
        const paths = twitchWebsite.url.split('/')
        return paths[paths.length - 1]
      }
      return null
    },
    show() {
      const show = this.channel || this.channels.length || this.videos.length
      if (show) {
        this.$emit('show')
      }
      return show
    }
  },
  async created() {
    const config = { headers: { 'Client-ID': 'u3ldgg67es5gq8hacgk7zdw71vnfbg' } }
    try {
      const {
        data: { streams }
      } = await this.$axios.get(
        `${apiBaseUrl}/streams/?game=${this.game.name}&limit=${this.channel ? 3 : 4}`,
        config
      )
      this.channels = streams.map(stream => stream.channel)

      if (this.channel) {
        const {
          data: { videos }
        } = await this.$axios.get(
          `${apiBaseUrl}/channels/${this.channel}/videos?limit=2`,
          config
        )
        this.videos = videos
      }
    } catch (e) {
      //
    }
  }
}
</script>
