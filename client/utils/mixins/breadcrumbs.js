import { flatten, startCase } from 'lodash'

export default {
  props: {
    insertedPaths: {
      type: Array,
      default: null,
      validator: array => array.length && !array.some(item => !item.text || !item.to)
    }
  },
  computed: {
    breadcrumbs() {
      const paths = this.$route.path.split('/')
      let breadcrumbs = paths
        .map((path, index) => ({
          text: startCase(path),
          to: [...Array(index + 1).keys()].map(i => paths[i]).join('/')
        }))
        .filter(path => path.text && path.to)
      if (this.insertedPaths) {
        breadcrumbs.splice(breadcrumbs.length - 1, 0, this.insertedPaths)
        breadcrumbs = flatten(breadcrumbs)
      }
      return breadcrumbs
    }
  }
}
