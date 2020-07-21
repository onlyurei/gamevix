<template>
  <div />
</template>
<script>
export default {
  async fetch({ redirect }) {
    redirect(301, '/games')
  }
}
</script>
