import { upperFirst } from 'lodash'
import { paginate, pagination } from './pagination'

export default {
  mixins: [pagination],
  head() {
    return { title: `Game ${upperFirst(this.entitiesName)}` }
  },
  methods: {
    async paginate({ store, route }) {
      return paginate(route, async paginationParams =>
        store.dispatch(`entities_browse/get${upperFirst(this.entitiesName)}`, {
          ...paginationParams
        })
      )
    }
  }
}
