export function setScrollable(state, key, results) {
  if (state[key].scrollCount && results.scrollCount === undefined) {
    state[key] = results
  } else {
    state[key] = results
  }
}

const endpointPrefix = '/video-games/'
export const endpointPrefixes = {
  collections: `${endpointPrefix}collections`,
  companies: `${endpointPrefix}companies`,
  franchises: `${endpointPrefix}franchises`,
  games: `${endpointPrefix}games`,
  genres: `${endpointPrefix}genres`,
  keywords: `${endpointPrefix}keywords`,
  platforms: `${endpointPrefix}platforms`,
  themes: `${endpointPrefix}themes`,
  pulses: `${endpointPrefix}pulses`,
  pulse_groups: `${endpointPrefix}pulse_groups`,
  reviews: `${endpointPrefix}reviews`
}

export const defaultLimit = 12
export const defaultOffset = 0

export const defaultGameFields =
  'name,slug,summary,cover,popularity,first_release_date,release_dates,total_rating,total_rating_count,websites'

export function getFilteredFieldName(filters) {
  let finalFieldPos = filters.indexOf('.')
  finalFieldPos = finalFieldPos > -1 ? finalFieldPos : 0
  let postfixPos = filters.indexOf('-')
  postfixPos = postfixPos > -1 ? postfixPos : filters.length - 1
  return filters.slice(finalFieldPos, postfixPos)
}

export function getFilteredGameBrowseUrlByField(field) {
  return entity =>
    getFilteredGameBrowseUrl.call({
      ...entity,
      ...{ value: entity.id, field, postfix: 'eq' }
    })
}

export function getFilteredGameBrowseUrl(entity = this) {
  const isValueNumeric = !Number.isNaN(entity.value)
  return `/games/browse/${entity.field}?${
    entity.slug ? `slug=${entity.slug}&` : ''
  }filters="${entity.field}-${entity.postfix}":${isValueNumeric ? '' : '"'}${
    entity.value
  }${isValueNumeric ? '' : '"'}${entity.name ? `&name=${entity.name}` : ''}`
}
