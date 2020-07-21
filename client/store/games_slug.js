import { flatten, uniqBy } from 'lodash'

import stripTags from 'striptags'

import { endpointPrefixes } from '../utils/adapters/igdb'

const defaultBackgroundRGB = '12,12,12'

const freshGameThreshold = 31556952000 * 10 // years in milliseconds

const fields = '*'
const endpointPrefix = endpointPrefixes.games

export const actions = {
  async getGame({ commit }, { slug }) {
    let game
    const urlWithoutExpand = `${endpointPrefix}?filters=slug="${slug}"&fields=${fields}`
    game = await this.$axios.get(urlWithoutExpand)
    commit('SET_GAME', game.data[0])
  },
  async getPlatforms({ commit, state }) {
    commit('SET_PLATFORMS', [])
    if (Array.isArray(state.game.release_dates)) {
      try {
        const platforms = [
          ...new Set(state.game.release_dates.map(release_date => release_date.platform))
        ]
        commit(
          'SET_PLATFORMS',
          (await this.$axios
            .get(
              `${endpointPrefixes.platforms}?ids=[${platforms.join(
                ','
              )}]&fields=name,slug,website`
            )
            .then(res => res.data)).sort((a, b) => a.name > b.name)
        )
      } catch (e) {
        //
      }
    }
  },
  async getCollection({ commit, state }) {
    commit('SET_COLLECTION', 0)
    if (Number.isInteger(state.game.collection)) {
      try {
        commit(
          'SET_COLLECTION',
          await this.$axios
            .get(
              `${endpointPrefixes.collections}?ids=[${state.game.collection}]&fields=name,slug`
            )
            .then(res => res.data[0])
        )
      } catch (e) {
        //
      }
    }
  },
  async getFranchise({ commit, state }) {
    commit('SET_FRANCHISE', 0)
    if (Number.isInteger(state.game.franchise)) {
      try {
        commit(
          'SET_FRANCHISE',
          await this.$axios
            .get(
              `${endpointPrefixes.franchises}?ids=[${state.game.franchise}]&fields=name,slug`
            )
            .then(res => res.data)
        )
      } catch (e) {
        //
      }
    }
  },
  async getPulseGroups({ commit, state }) {
    commit('SET_PULSE_GROUPS', [])
    if (state.game.id) {
      const now = new Date().getTime()
      const gameFirstReleaseDate = state.game.first_release_date || 0
      if (now - gameFirstReleaseDate <= freshGameThreshold) {
        try {
          commit(
            'SET_PULSE_GROUPS',
            await this.$axios
              .get(
                `${endpointPrefixes.pulse_groups}?filters=game=${state.game.id}}&fields=pulses.title,pulses.summary,pulses.url,pulses.author,pulses.published_at,pulses.updated_at,pulses.image&expand=pulses&order=published_at:desc&limit=24`
              )
              .then(res => res.data)
          )
        } catch (e) {
          //
        }
      }
    }
  },
  async getReviews({ commit, state }) {
    commit('SET_REVIEWS', [])
    if (state.game.id) {
      try {
        commit(
          'SET_REVIEWS',
          await this.$axios
            .get(
              `${endpointPrefixes.reviews}?filters=game=${state.game.id}}&fields=updated_at,username,introduction,content,conclusion,positive_points,negative_points,likes,views`
            )
            .then(res => res.data)
        )
      } catch (e) {
        //
      }
    }
  },
  async getSummarizedFullDescription({ commit, state, getters }) {
    let summarizedFullDescription = ''
    try {
      const pulses = getters.pulses
      const reviews = state.reviews

      const summaryParagraphs = state.game.summary.split('\n')
      summaryParagraphs.shift()

      const description = [
        ...new Set(
          [
            state.game.storyline,
            summaryParagraphs.join('\n'),
            state.game.esrb && state.game.esrb.synopsis,
            reviews
              .map(review => (review.introduction || '').replace(/\n/g, ''))
              .join('\n'),
            pulses.map(pulse => pulse.title).join('.\n'),
            pulses.map(pulse => stripTags(pulse.summary)).join('\n'),
            reviews.map(review => (review.content || '').replace(/\n/g, '')).join('\n'),
            reviews
              .map(review => (review.conclusion || '').replace(/\n/g, ''))
              .join('\n'),
            reviews
              .map(review => (review.positive_points || '').replace(/\n/g, ''))
              .join('\n'),
            reviews
              .map(review => (review.negative_points || '').replace(/\n/g, ''))
              .join('\n')
          ]
            .filter(text => text)
            .map(text => text.trim())
        )
      ]
        .join('\n\n') //double break to mark as paragraphs
        .trim()

      if (description) {
        const { data } = await this.$axios.post('/utils/text-summarizer', {
          text: description
        })
        summarizedFullDescription = data
      }
    } catch (e) {
      //noop
    }
    commit('SET_SUMMARIZED_FULL_DESCRIPTION', summarizedFullDescription)
  }
}

export const mutations = {
  SET_GAME(state, game) {
    state.game = game
  },
  SET_PLATFORMS(state, platforms) {
    state.platforms = platforms
  },
  SET_COLLECTION(state, collection) {
    state.collection = collection
  },
  SET_FRANCHISE(state, franchise) {
    state.franchise = franchise
  },
  SET_PULSE_GROUPS(state, pulseGroups) {
    state.pulseGroups = pulseGroups
  },
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews
  },
  SET_BACKGROUND_RGB(state, backgroundRGB = defaultBackgroundRGB) {
    state.backgroundRGB = backgroundRGB
  },
  SET_SUMMARIZED_FULL_DESCRIPTION(state, summarizedFullDescription) {
    state.summarizedFullDescription = summarizedFullDescription
  }
}

export const getters = {
  pulses: state =>
    state.pulseGroups && state.pulseGroups.length
      ? uniqBy(
          flatten(state.pulseGroups.map(pulseGroup => pulseGroup.pulses)).filter(
            pulse => pulse.title && pulse.url
          ),
          'id'
        )
      : []
}

export const state = () => ({
  game: {},
  platforms: [],
  collection: 0,
  franchise: 0,
  pulseGroups: [],
  reviews: [],
  backgroundRGB: defaultBackgroundRGB,
  summarizedFullDescription: ''
})
