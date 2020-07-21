export default {
  data() {
    return {
      updating: false
    }
  },
  watch: {
    updating(value) {
      const fieldset = this.$refs.form.$el[0]
      fieldset.disabled = value
    }
  }
}
