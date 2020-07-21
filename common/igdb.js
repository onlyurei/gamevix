const platforms = require('../common/configs/platforms.json')

function getEntityMainImage(entity) {
  let image =
    entity.cover ||
    (entity.screenshots && entity.screenshots.length && entity.screenshots[0]) ||
    entity.logo ||
    entity.mug_shot ||
    entity.background ||
    entity.image
  if (typeof image !== 'object') {
    image = {}
  }
  if (!image.url) {
    image.url = ''
  }
  return image
}

const defaultPopularity = 7
const defaultRating = 50
const baseReleaseDate = 946684800000

function getGameMarketScores(game, igdbPlatformId = 0) {
  const popularity = game.popularity || Math.pow(2, defaultPopularity)
  const releaseDate = game.first_release_date || baseReleaseDate
  const platform = platforms.find(p => p.igdbId === igdbPlatformId)
  const platformGeneration = platform ? platform.generation : 0

  const popularityScore = ((Math.log2(popularity) - defaultPopularity) / 14.0) * 100 + 50
  const ratingScore = game.total_rating || defaultRating
  const releaseDateScore = ((releaseDate - baseReleaseDate) / 2073600000000.0) * 100 + 50
  const platformGenerationScore = platformGeneration * 1.5

  const score = Math.min(
    0.2 * popularityScore +
      0.4 * ratingScore +
      0.4 * releaseDateScore +
      platformGenerationScore,
    100
  )

  return {
    score,
    popularityScore,
    ratingScore,
    releaseDateScore,
    platformGenerationScore
  }
}

module.exports = {
  getEntityMainImage,
  getGameMarketScores
}
