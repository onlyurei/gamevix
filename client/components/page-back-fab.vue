<template>
  <v-btn v-if="show" fab fixed bottom left @click="goBack">
    <v-icon>arrow_back</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    if (this.$vuetify.breakpoint.mdAndDown) {
      this.show = true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn--fixed
  z-index 4
</style>
