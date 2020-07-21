<template>
  <div />
</template>

<script>
export default {
  async fetch({ store }) {
    try {
      await store.dispatch('logout')
      window.location = '/login'
    } catch (e) {
      //noop
    }
  }
}
</script>
