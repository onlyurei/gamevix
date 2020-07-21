<template>
  <v-content>
    <v-container>
      <h1 class="title">
        Sorry, we have trouble loading the page
      </h1>
      <blockquote class="blockquote">
        <p v-if="error.message">
          {{ error.message }}
        </p>
        <p v-if="error.statusCode">
          Error code: {{ error.statusCode }}
        </p>
      </blockquote>
      <a
        v-if="error && error.statusCode !== 404"
        :href="$route.fullPath.replace($route.hash, '')"
        class="subheading"
      >
        Go back to previous page
      </a>
      <h2 class="subheading mt-4 mb-2">
        Useful links
      </h2>
      <ul class="browser-list--unstyled">
        <li>
          <nuxt-link to="/">
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/news">
            Latest game news
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/games">
            Discover games
          </nuxt-link>
        </li>
      </ul>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: { error: { type: Object, required: true } }
}
</script>
