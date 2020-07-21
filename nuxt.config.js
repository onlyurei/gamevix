const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const { babel } = require('./package')
const { stringLengthInBytes } = require('./common/utils')
const { aDay } = require('./common/time-periods-in-seconds')

module.exports = {
  head: {
    titleTemplate: '%s - GameVix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'application-name', content: 'GameVix' },
      { name: 'apple-mobile-web-app-title', content: 'GameVix' },
      { name: 'msapplication-TileColor', content: '#212121' },
      { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      {
        rel: 'dns-prefetch',
        href: '//fonts.googleapis.com'
      },
      {
        rel: 'dns-prefetch',
        href: '//fonts.gstatic.com'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons'
      },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/apple-touch-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-touch-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon-180x180.png'
      },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#f9a72d' }
    ]
  },
  meta: {
    description: false,
    ogDescription: false,
    ogTitle: false
  },
  loading: '~/components/layouts/loading.vue',
  srcDir: 'client/',
  build: {
    babel,
    extractCSS: true,
    plugins: [
      new DuplicatePackageCheckerPlugin({
        verbose: true,
        emitError: true,
        showHelp: true
      })
    ],
    vendor: ['~/plugins/babel-polyfill', '~/plugins/vue-star-rating.js', 'json-mapper']
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  proxy: ['https://images.igdb.com/igdb/image'],
  modules: [
    '@nuxtjs/axios',
    [
      '@nuxtjs/component-cache',
      {
        length: stringLengthInBytes,
        max: 1024 * 1024 * 32, // bytes
        maxAge: 1000 * aDay, // milliseconds
        stale: true
      }
    ],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-110539953-1',
        autoTracking: {
          exception: true
        }
      }
    ],
    'nuxt-imagemin',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],
  plugins: [
    '~/plugins/breadcrumbs.js',
    '~/plugins/entities.js',
    '~/plugins/game-pulses.js',
    '~/plugins/igdb-entity-grid-list.js',
    '~/plugins/igdb-entity-list-item.js',
    '~/plugins/pagination.js',
    { src: '~/plugins/social-sharing-links.js', ssr: false },
    '~/plugins/v-card-media-custom.js',
    '~/plugins/vue-form-generator.js',
    '~/plugins/vue-lazyload.js',
    '~/plugins/vue-social-sharing.js',
    '~/plugins/vue-star-rating.js',
    '~/plugins/vue-youtube-embed.js',
    '~/plugins/vuetify.js'
  ],
  css: [{ src: '~/assets/style/app.styl', lang: 'styl' }],
  transition: { css: false, name: '' }
}
