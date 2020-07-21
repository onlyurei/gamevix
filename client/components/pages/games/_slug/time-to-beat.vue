<template>
  <dl v-if="game.time_to_beat" class="mt-3">
    <template
      v-for="type in ['hastly', 'normally', 'completely']"
      v-if="game.time_to_beat[type]"
    >
      <div :key="type" class="d-inline-block mr-4 mt-1">
        <dt>Time to Beat ({{ type }})</dt>
        <dd>
          <time>{{ secondsToTime(game.time_to_beat[type]) }}</time>
          <meta
            :content="`PT${secondsToTime(game.time_to_beat[type])}`"
            itemprop="timeRequired"
          >
        </dd>
      </div>
    </template>
  </dl>
</template>

<script>
import igdbGame from '../../../../utils/mixins/igdb-game'

const minuteInSeconds = 60
const hourInSeconds = minuteInSeconds * 60

export default {
  mixins: [igdbGame],
  methods: {
    secondsToTime(timeInSeconds) {
      const hours = Math.floor(timeInSeconds / hourInSeconds)
      const minutes = Math.floor(
        (timeInSeconds - hours * hourInSeconds) / minuteInSeconds
      )
      const seconds = timeInSeconds - hours * hourInSeconds - minutes * minuteInSeconds
      return `${hours}H:${minutes}M:${seconds}S`
    }
  }
}
</script>
