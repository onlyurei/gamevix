<template>
  <div>
    <h2 class="mt-4 mb-2 headline">
      Game Swap Preferences
    </h2>
    <v-layout row wrap>
      <v-flex>
        <v-select
          v-model="swapPreferences"
          :items="gameSwapPreferences"
          :autocomplete="!isTouch"
          item-text="name"
          item-value="id"
          label="Preferences"
          multiple
          chips
          deletable-chips
          return-object
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dom from '../../../../../utils/mixins/dom'

export default {
  mixins: [dom],
  computed: {
    ...mapGetters('member_account', ['gameSwapPreferences']),
    swapPreferences: {
      get() {
        return this.$store.state.member_account.swapPreferences
      },
      set(values) {
        this.$store.dispatch('member_account/updateSwapPreferences', {
          id: this.$store.state.passport.id,
          swapPreferences: values
        })
      }
    }
  }
}
</script>
