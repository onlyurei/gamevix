<template>
  <model-update-form
    v-bind="{ formName, fields, additionalSchema, getAction, updateAction }"
    model-name="User"
    store-state-path="member_account"
  />
</template>

<script>
import ModelUpdateForm from '../../../../model-update-form.vue'

export default {
  components: {
    ModelUpdateForm
  },
  props: {
    formName: { type: String, default: '' },
    fields: { type: Array, required: true },
    additionalSchema: { type: Object, default: () => null }
  },
  methods: {
    async getAction() {
      return this.$store.dispatch('member_account/getUser', {
        id: this.$store.state.passport.id
      })
    },
    async updateAction(model) {
      return this.$store.dispatch('member_account/updateUser', {
        id: this.$store.state.passport.id,
        user: model
      })
    }
  }
}
</script>
