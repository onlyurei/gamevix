<template>
  <v-container grid-list-lg class="text-xs-center pt-5">
    <h2 class="display-1">
      How It Works
    </h2>
    <v-layout row wrap pt-2>
      <v-flex xs12 sm4>
        <v-avatar color="info" size="55" class="mt-1 mb-2">
          <v-icon x-large>
            videogame_asset
          </v-icon>
        </v-avatar>
        <h3 class="headline">
          Log Games
        </h3>
        <p class="pt-2 subheading">
          Log your currently owned games into
          <nuxt-link to="/member/account?utm_medium=home-hiw#games">
            Your Games
          </nuxt-link>. We will match your games with games from others with similar
          <img
            src="/favicon-32x32.png"
            height="16"
            alt="GameVix"
            class="gamevix-score-logo"
          >
          GameVix Scores for you.
        </p>
      </v-flex>
      <v-flex xs12 sm4>
        <v-avatar color="primary" size="55" class="mt-1 mb-2">
          <v-icon x-large>
            local_post_office
          </v-icon>
        </v-avatar>
        <h3 class="headline">
          Mail Old Game
        </h3>
        <p class="pt-2 subheading">
          Once your game has a matched game to swap, you'll get a notification. Once
          confirmed, print the postage and ship the game to the new owner.
        </p>
      </v-flex>
      <v-flex xs12 sm4>
        <v-avatar color="success" size="55" class="mt-1 mb-2">
          <v-icon x-large>
            local_post_office
          </v-icon>
        </v-avatar>
        <h3 class="headline">
          Get New Game
        </h3>
        <p class="pt-2 subheading">
          You'll receive your matched new game from another owner shortly. Repeat the
          steps to play new games this way without breaking the wallet.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.gamevix-score-logo
  position relative
  top 3px
</style>
