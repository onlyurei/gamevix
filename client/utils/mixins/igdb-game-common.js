import { round } from 'lodash'

export default {
  computed: {
    fiveStarRating() {
      const entity = this.game || this.entity
      if (!isNaN(entity.total_rating)) {
        return round(entity.total_rating / 20, 1)
      }
      return NaN
    }
  }
}
