<template>
  <div>
    <label>Username</label>
    <div class="subheading">
      {{ user.username }}
    </div>
    <v-divider class="mt-4" />
    <user-section :fields="['firstName', 'lastName', 'email']" form-name="Basic Info" />
    <template v-if="checkEmailUrl">
      <v-alert :value="true" type="warning">
        Please
        <a :href="checkEmailUrl" target="_blank" rel="noopener">check your email inbox</a>
        to verify your email.
      </v-alert>
      <v-alert :value="!resentEmailVerification" type="info">
        Did not receive the verification email? Please check your email spam folder, or
        <a
          @click.prevent="
            resendEmailVerification({ id: user.id })
            resentEmailVerification = true
          "
        >
        request to resend the verification email</a>.
      </v-alert>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserSection from './user-section.vue'

export default {
  components: {
    UserSection
  },
  data() {
    return {
      resentEmailVerification: false
    }
  },
  computed: {
    ...mapState('member_account', ['user']),
    checkEmailUrl() {
      const email = this.user.email
      if (email && !this.user.emailVerified) {
        return `https://${email.split('@')[1]}`
      }
      return null
    }
  },
  methods: {
    ...mapActions('member_account', ['resendEmailVerification'])
  }
}
</script>
