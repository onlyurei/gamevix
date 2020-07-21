<template>
  <v-progress-circular
    v-if="loading"
    :size="34"
    indeterminate
    class="loading primary--text"
  />
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.loading
  position fixed
  top 8px
  left 205px
  z-index 9999

@media only screen and (max-width: 599px)
  .loading
    left 52px

@media only screen and (max-width: 389px)
  .loading
    left auto
    top 4px
    right 105px
</style>
