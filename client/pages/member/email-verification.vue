<template>
  <v-container class="d-block">
    <h1 class="title">
      Email Verification
    </h1>
    <v-alert v-if="success" :value="true" type="success">
      Thank you for verifying your email.
    </v-alert>
    <v-alert v-else :value="true" type="warning">
      Verification failed. You might have already clicked on the link that brought you
      here.
    </v-alert>
    <div class="text-xs-center pt-3">
      <v-btn color="primary" nuxt to="/member/account">
        Your Account
      </v-btn>
      <v-btn nuxt to="/">
        Home
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  async asyncData({ query, axios }) {
    const { token: emailToken } = query
    let success = false
    try {
      const { status } = await axios.patch(`/users/email-verification`, {
        emailToken
      })
      success = status === 200
    } catch (e) {
      //
    }
    return {
      success
    }
  },
  head() {
    return {
      title: 'Email Verification'
    }
  }
}
</script>
