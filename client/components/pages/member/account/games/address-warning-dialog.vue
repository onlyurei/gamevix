<template>
  <v-dialog :value="addressWarningDialog" max-width="400" lazy persistent>
    <v-card>
      <v-card-title class="headline">
        No shipping address on file
      </v-card-title>
      <v-card-text class="subheading">
        In order to participate in game swaps, please add your shipping address.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn flat="flat" @click.native="SET_ADDRESS_WARNING_DIALOG(false)">
          Cancel
        </v-btn>
        <v-btn
          color="green"
          flat="flat"
          @click.native="
            SET_ADDRESS_WARNING_DIALOG(false)
            SET_TAB_ID('profile')
          "
        >
          Add Address
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('member_account', ['addressWarningDialog'])
  },
  methods: {
    ...mapMutations('member_account', ['SET_ADDRESS_WARNING_DIALOG', 'SET_TAB_ID'])
  }
}
</script>
