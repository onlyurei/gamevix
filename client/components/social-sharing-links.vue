<template>
  <social-sharing v-bind="{ url, title, description, hashtags }" inline-template>
    <div class="social-sharing-links">
      <network
        v-for="network in [
          'Facebook',
          'Twitter',
          'Reddit',
          'Googleplus',
          'Pinterest',
          'Telegram',
          'Whatsapp',
          'Line'
        ]"
        :key="network"
        :network="network.toLowerCase()"
      >
        <a :title="`Share on ${network}`">
          <img
            :src="`/logos/social-networks/${network.toLowerCase()}.svg`"
            :alt="`${network} icon`"
            class="social-icon"
          >
        </a>
      </network>
    </div>
  </social-sharing>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    hashtags: { type: String, default: '' }
  },
  data() {
    return {
      url: ''
    }
  },
  beforeMount() {
    this.url = window.location.href
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
.social-sharing-links
  .social-icon
    filter invert(.92)
    cursor pointer
    width 42px
    padding 1px 10px
    &:hover
      filter invert(1)
</style>
