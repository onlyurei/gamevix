import { difference } from 'lodash'
import host from '../../../common/configs/host'

const maxOffset = 10000

export const params = {
  limit: require('../../../common/configs/pagination.json').limit,
  maxOffset: 1440
}

export const pagination = {
  watchQuery: true,
  head() {
    const link = []
    if (this.page === 1) {
      const { page, ...query } = this.$route.query
      link.push({
        rel: 'canonical',
        href: `${host.origin}${
          this.$router.resolve({
            ...this.$route,
            ...{ query }
          }).href
        }`
      })
    }
    if (this.page > 1 || this.page < this.length) {
      function getNav(next = true) {
        return {
          rel: next ? 'next' : 'prev',
          href: `${host.origin}${
            this.$router.resolve({
              ...this.$route,
              ...{
                query: { ...this.$route.query, ...{ page: this.page + (next ? 1 : -1) } }
              }
            }).href
          }`
        }
      }
      if (this.page > 1) {
        link.push(getNav.call(this, false))
      }
      if (this.page < this.length) {
        link.push(getNav.call(this, true))
      }
    }
    return {
      link
    }
  },
  data() {
    return {
      page: parseInt(this.$route.query.page) || 1
    }
  },
  computed: {
    length() {
      return Math.ceil(
        Math.min(this.maxOffset || params.maxOffset, maxOffset) /
          (this.limit || params.limit)
      )
    },
    offset() {
      return (this.page - 1) * this.limit
    }
  },
  watch: {
    page() {
      this.$router.push({ query: { ...this.$route.query, page: this.page } })
    }
  }
}

export async function paginate(route, fn, ...args) {
  const { limit } = popParams(args) || params
  return fn(...args, {
    limit,
    offset: pagination.computed.offset.call({
      page: pagination.data.call({ $route: route }).page,
      limit
    })
  })
}

function popParams(args) {
  const lastArg = args[args.length - 1]
  if (
    typeof lastArg === 'object' &&
    difference(Object.keys(lastArg), Object.keys(params)).length === 0
    // make sure lastArg is a subset of params
  ) {
    args.pop()
    return lastArg
  }
  return null
}
