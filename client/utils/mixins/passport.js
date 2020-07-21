import { startsWith } from 'lodash'

const noRedirectPaths = ['/login', '/signup']

export default {
  computed: {
    passport() {
      return this.$store.state.passport
    },
    displayName() {
      return this.passport && (this.passport.firstName || this.passport.username)
    },
    initial() {
      return this.displayName && this.displayName[0]
    },
    loginRedirectQueryParam() {
      if (noRedirectPaths.find(path => startsWith(this.$route.fullPath, path))) {
        return ''
      }
      return `?ref=${encodeURIComponent(this.$route.fullPath)}`
    }
  }
}
