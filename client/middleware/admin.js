export default async function({ store, error }) {
  await store.dispatch('setIsAdminUser')
  if (!store.state.isAdminUser) {
    return error({ statusCode: 404, message: 'This page could not be found' })
  }
}
