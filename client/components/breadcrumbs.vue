<template>
  <v-breadcrumbs divider=">" itemscope itemtype="http://schema.org/BreadcrumbList">
    <v-breadcrumbs-item
      v-for="(item, i) in breadcrumbs"
      :key="item.text"
      v-bind="item"
      exact
      nuxt
      itemprop="itemListElement"
      itemscope
      itemtype="http://schema.org/ListItem"
    >
      <div itemprop="item" itemscope itemtype="http://schema.org/Thing">
        <span itemprop="name">{{ item.text }}</span>
        <meta :content="item.to" itemprop="url">
      </div>
      <meta :content="i + 1" itemprop="position">
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
import breadcrumbs from '../utils/mixins/breadcrumbs'

export default {
  mixins: [breadcrumbs]
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.breadcrumbs
  justify-content left
  padding 0
  margin-top 0px
  margin-bottom 10px
</style>

<style rel="stylesheet/stylus" lang="stylus">
.breadcrumbs
  .breadcrumbs__item
    height 30px
</style>
