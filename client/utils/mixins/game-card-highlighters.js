import { round } from 'lodash'

export default {
  methods: {
    releaseDateHighlighter: game =>
      game.first_release_date
        ? `${new Date(
            game.first_release_date
          ).toLocaleDateString()}<meta itemprop="datePublished" content="${new Date(
            game.first_release_date
          )}">`
        : '',
    popularityHighlighter: game =>
      isNaN(game.popularity) ? '' : `Popularity: ${game.popularity.toFixed(0)}`,
    ratingHighlighter: game =>
      isNaN(game.total_rating)
        ? ''
        : `Rating: ${round(game.total_rating / 20, 1)}${
            isNaN(game.total_rating_count) || !game.total_rating_count
              ? ''
              : ` - ${game.total_rating_count.toLocaleString()} votes`
          }`
  }
}
