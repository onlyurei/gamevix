import { sortBy, truncate } from 'lodash'
import { mapGetters, mapState } from 'vuex'
import { getEntityMainImage } from '../../../common/igdb'

const metaDescriptionLength = 360
const summarizedFullDescriptionMinimumLength = 180

export default {
  data() {
    return {
      backgroundAlpha: 0.72
    }
  },
  computed: {
    ...mapState('games_slug', [
      'game',
      'platforms',
      'collection',
      'franchise',
      'reviews',
      'backgroundRGB',
      'summarizedFullDescription'
    ]),
    ...mapGetters('games_slug', ['pulses']),
    mainImageUrl() {
      return this.getImageRendition(getEntityMainImage(this.game).url, '720p')
    },
    genre() {
      return this.game.genres && this.game.genres[0]
    },
    theme() {
      return this.game.themes && this.game.themes[0]
    },
    releaseDates() {
      return (
        (this.game.release_dates &&
          this.platforms &&
          this.platforms.length &&
          this.game.release_dates.map(release_date => {
            const foundPlatform = this.platforms.find(
              platform => platform.id === release_date.platform
            )
            return {
              id: release_date.platform,
              platform: foundPlatform,
              date: release_date.date
            }
          })) ||
        []
      )
    },
    summary() {
      return this.game.summary
    },
    storyline() {
      return this.game.storyline
    },
    synopsis() {
      return [
        { source: 'esrb', text: this.game.esrb && this.game.esrb.synopsis },
        { source: 'pegi', text: this.game.pegi && this.game.pegi.synopsis }
      ]
        .filter(synopsis => synopsis.text)
        .map(synopsis => `${synopsis.source.toUpperCase()} Synopsis\n${synopsis.text}`)
        .join('\n\n')
        .trim()
    },
    fullDescription() {
      return [this.summary, this.storyline, this.synopsis]
        .filter(text => text)
        .join('\n\n')
        .trim()
    },
    metaDescription() {
      return truncate(
        (this.summarizedFullDescription &&
        this.summarizedFullDescription.length >= summarizedFullDescriptionMinimumLength
          ? this.summarizedFullDescription
          : this.fullDescription
        )
          .replace(/\n/g, ' ')
          .replace(/ +/g, ' ')
          .trim(),
        {
          length: metaDescriptionLength,
          separator: ' '
        }
      )
    },
    videoHeight() {
      if (this.$vuetify.breakpoint.xs) {
        return 200
      }
      if (this.$vuetify.breakpoint.sm) {
        return 360
      }
      if (this.$vuetify.breakpoint.md) {
        return 240
      }
      if (this.$vuetify.breakpoint.lg) {
        return 320
      }
      if (this.$vuetify.breakpoint.xl) {
        return 480
      }
      return 320
    },
    website() {
      if (this.game.websites && this.game.websites.length) {
        return sortBy(this.game.websites, 'category')[0]
      }
      return null
    }
  }
}
