<template>
  <lazy-component>
    <v-jumbotron
      src="/stock-photos/gamepads.jpg"
      height="320px"
      gradient="to bottom, rgba(0, 0, 0, .85), rgba(0, 0, 0, .15)"
      class="pricing-info"
    >
      <v-container fill-height>
        <v-layout align-center>
          <div>
            <h2 class="display-1">
              Swap Games with GameVix
            </h2>
            <ul class="title browser-list">
              <li>Shipping/tracking included — no any other hidden fees</li>
              <li>
                Swap games directly: send games, get games — no tricky "site credits"
              </li>
              <li>Swap games on-demand — no subscription required</li>
            </ul>
            <v-btn
              large
              color="primary"
              nuxt
              to="/signup?utm_medium=home-pricing-info"
              class="mt-4 mx-0"
            >
              Sign Up for Free Today
            </v-btn>
          </div>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </lazy-component>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
ul.title
  li
    margin-top 8px
</style>

<style lang="stylus">
.main.index
  .pricing-info
    .jumbotron__image
      min-height 320px
</style>
