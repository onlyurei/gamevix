<template>
  <v-container>
    <section-basic />
    <v-divider class="mt-4" />
    <section-password />
    <v-divider class="mt-4" />
    <section-address />
  </v-container>
</template>

<script>
import SectionAddress from './section-address.vue'
import SectionBasic from './section-basic.vue'
import SectionPassword from './section-password.vue'

export default {
  components: {
    SectionBasic,
    SectionPassword,
    SectionAddress
  }
}
</script>
