import {
  defaultGameFields,
  defaultLimit,
  defaultOffset,
  endpointPrefixes,
  setScrollable
} from '../utils/adapters/igdb'

export const mutations = {
  SET_RECENTLY_RELEASED(state, games) {
    setScrollable(state, 'recentlyReleased', games)
  },
  SET_TO_BE_RELEASED(state, games) {
    setScrollable(state, 'toBeReleased', games)
  },
  SET_MOST_ANTICIPATED(state, games) {
    setScrollable(state, 'mostAnticipated', games)
  },
  SET_POPULAR(state, games) {
    setScrollable(state, 'popular', games)
  },
  SET_BEST_RATED(state, games) {
    setScrollable(state, 'bestRated', games)
  },
  SET_FILTERED_BY(state, games) {
    setScrollable(state, 'filteredBy', games)
  }
}

export const state = () => ({
  recentlyReleased: {},
  toBeReleased: {},
  mostAnticipated: {},
  popular: {},
  bestRated: {},
  filteredBy: {}
})

const endpointPrefix = `${endpointPrefixes.games}?`
const defaultFilters = 'cover != n & '
const defaultOrder = 'total_rating:desc,total_rating_count:desc,popularity:desc'

async function getGames(
  mutation,
  filters,
  order,
  transformer,
  { commit },
  { limit = defaultLimit, offset = defaultOffset } = {}
) {
  return commit(
    mutation,
    await this.$axios
      .get(
        `${endpointPrefix}limit=${limit}&offset=${offset}&filters=${defaultFilters}${
          filters ? `,${filters}` : ''
        }&order=${order}&fields=${defaultGameFields}`
      )
      .then(transformer)
  )
}

function getBeginningOfTodayUTCTime() {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return today.getTime() / 1000
}

export const actions = {
  getRecentlyReleased(...args) {
    const beginningOfTodayUTCTime = getBeginningOfTodayUTCTime()
    return getGames.call(
      this,
      'SET_RECENTLY_RELEASED',
      `first_release_date < ${beginningOfTodayUTCTime} & first_release_date > ${beginningOfTodayUTCTime -
        15811200000}`, // days in milliseconds: 183 * (1000 * 60 * 60 * 24)
      `first_release_date:desc,${defaultOrder}`,
      res => res.data,
      ...args
    )
  },
  getToBeReleased(...args) {
    return getGames.call(
      this,
      'SET_TO_BE_RELEASED',
      `first_release_date > ${getBeginningOfTodayUTCTime()}`,
      `first_release_date:asc,hypes:desc,${defaultOrder}`,
      res => res.data,
      ...args
    )
  },
  getMostAnticipated(...args) {
    return getGames.call(
      this,
      'SET_MOST_ANTICIPATED',
      `first_release_date > ${getBeginningOfTodayUTCTime()} & hypes >= 1`,
      `hypes:desc,${defaultOrder}`,
      res => res.data,
      ...args
    )
  },
  getPopular(...args) {
    return getGames.call(
      this,
      'SET_POPULAR',
      'popularity >= 3 & themes != [42]',
      'popularity:desc,total_rating:desc,total_rating_count:desc',
      res => res.data,
      ...args
    )
  },
  getBestRated(...args) {
    return getGames.call(
      this,
      'SET_BEST_RATED',
      'total_rating >= 70 & total_rating_count >= 20',
      'total_rating:desc,total_rating_count:desc,popularity:desc',
      res => res.data,
      ...args
    )
  },
  getFilteredBy(...args) {
    const filters = args[1].filters
    const order = args[1].order
    return getGames.call(
      this,
      'SET_FILTERED_BY',
      filters,
      order || defaultOrder,
      res => res.data,
      ...args
    )
  }
}
