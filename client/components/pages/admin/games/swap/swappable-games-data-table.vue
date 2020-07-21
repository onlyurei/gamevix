<template>
  <v-data-table
    :items="games"
    v-bind="{ headers, loading }"
    :rows-per-page-items="[500, 1000, 5000, { text: 'All', value: -1 }]"
  >
    <template slot="items" slot-scope="props">
      <td>
        <a
          :href="
            `/api/usergames/${props.item.id}?populate=platform,owner,futureOwner,pastOwners`
          "
        >
          {{ props.item.id }}
        </a>
      </td>
      <td>
        <a
          :href="
            `${
              props.item.owner
                ? `/api/users/${props.item.owner.id}?populate=platforms,games,futureGames,pastGames,swapPreferences`
                : ''
            }`
          "
        >
          {{ props.item.owner && props.item.owner.username }}
        </a>
      </td>
      <td>
        <nuxt-link :to="`/games/${props.item.slug}`">
          {{ props.item.slug }}
        </nuxt-link>
      </td>
      <td>{{ props.item.platform.slug }}</td>
      <td>
        <a
          :href="
            `${
              props.item.futureOwner
                ? `/api/users/${props.item.futureOwner.id}?populate=platforms,games,futureGames,pastGames,swapPreferences`
                : ''
            }`
          "
        >
          {{ (props.item.futureOwner && props.item.futureOwner.username) || '' }}
        </a>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    games: { type: Array, required: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'left'
        },
        {
          text: 'owner',
          value: 'owner.username',
          align: 'left'
        },
        {
          text: 'slug',
          value: 'slug',
          align: 'left'
        },
        {
          text: 'platform',
          value: 'platform.slug',
          align: 'left'
        },
        {
          text: 'futureOwner',
          value: 'futureOwner.username',
          align: 'left'
        }
      ]
    }
  }
}
</script>
