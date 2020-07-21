<template>
  <model-update-form
    v-bind="{ getAction, updateAction, destroyAction }"
    :fields="[
      'fullName',
      'addressLine1',
      'addressLine2',
      'city',
      'state',
      'postalCode',
      'phoneNumber'
    ]"
    form-name="Shipping Address"
    model-name="Address"
    store-state-path="member_account"
  />
</template>

<script>
import ModelUpdateForm from '../../../../model-update-form.vue'

export default {
  components: {
    ModelUpdateForm
  },
  methods: {
    async getAction() {
      return this.$store.dispatch('member_account/getAddress', {
        id: this.$store.state.passport.id
      })
    },
    async updateAction(model) {
      return this.$store.dispatch('member_account/updateAddress', {
        id: this.$store.state.passport.id,
        address: model
      })
    },
    async destroyAction(model) {
      return this.$store.dispatch('member_account/destroyAddress', {
        id: this.$store.state.passport.id,
        address: model
      })
    }
  }
}
</script>
