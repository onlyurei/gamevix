export default {
  computed: {
    isTouch() {
      return 'ontouchstart' in document.documentElement /* eslint-env browser */
    }
  }
}
