<template>
  <user-section
    :fields="['password']"
    :additional-schema="{
      password: { type: 'password', label: 'New Password', required: true }
    }"
    form-name="Password"
  />
</template>

<script>
import UserSection from './user-section.vue'

export default {
  components: {
    UserSection
  }
}
</script>
