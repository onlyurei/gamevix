<template>
  <v-layout row wrap>
    <v-flex xs8 sm6 lg4 offset-xs2 offset-sm3 offset-lg4 class="mt-4">
      <h1 class="text-xs-center">
        Sign In
      </h1>
      <v-form ref="form" @submit.prevent="submit">
        <vue-form-generator v-bind="{ schema, model, options }" />
        <div class="text-xs-center">
          <v-btn :disabled="updating" color="primary" dark type="submit">
            Sign In
          </v-btn>
        </div>
        <div class="text-xs-center pt-3">
          <span>Not a member yet?</span>
          <v-btn flat color="primary" nuxt to="/signup">
            Sign Up
          </v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { asyncData, data } from '../utils/adapters/form'
import formUpdating from '../utils/mixins/form-updating'

const fields = ['identifier', 'password']

export default {
  asyncData: asyncData('User', fields, {
    identifier: { label: 'Email or Username', required: true },
    password: { type: 'password', required: true }
  }),
  head() {
    return {
      title: 'Sign In'
    }
  },
  mixins: [formUpdating],
  data: data(fields), // eslint-disable-line vue/no-shared-component-data
  methods: {
    async login() {
      try {
        this.updating = true
        await this.$store.dispatch('login', this.model)
        this.updating = false
        this.$router.push(this.$route.query.ref || '/')
      } catch (e) {
        this.updating = false
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.login()
      }
    }
  }
}
</script>
