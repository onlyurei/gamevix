<template>
  <v-layout row wrap>
    <v-flex xs8 sm6 lg4 offset-xs2 offset-sm3 offset-lg4 class="mt-4">
      <h1 class="text-xs-center">
        Sign Up
      </h1>
      <v-form ref="form" @submit.prevent="submit">
        <vue-form-generator v-bind="{ schema, model, options }" />
        <div class="text-xs-center">
          <v-btn :disabled="updating" color="primary" dark type="submit">
            Sign Up
          </v-btn>
        </div>
        <div class="text-xs-center pt-3">
          <span>Already a member?</span>
          <v-btn flat color="primary" nuxt to="/login">
            Sign In
          </v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { asyncData, data } from '../utils/adapters/form'
import formUpdating from '../utils/mixins/form-updating'

const fields = ['firstName', 'email', 'username', 'password']

export default {
  asyncData: asyncData('User', fields, {
    password: { type: 'password', required: true }
  }),
  head() {
    return {
      title: 'Sign Up'
    }
  },
  mixins: [formUpdating],
  data: data(fields), // eslint-disable-line vue/no-shared-component-data
  methods: {
    async signup() {
      try {
        this.updating = true
        await this.$store.dispatch('signup', this.model)
        const { username: identifier, password } = this.model
        await this.$store.dispatch('login', { identifier, password })
        this.updating = false
        this.$router.push(this.$route.query.ref || '/')
      } catch (e) {
        this.updating = false
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.signup()
      }
    }
  }
}
</script>
