export default function({ store, redirect, route }) {
  if (!store.state.passport) {
    return redirect(`/login?ref=${encodeURIComponent(route.fullPath)}`)
  }
}
