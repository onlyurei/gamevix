import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1.5,
  throttleWait: 150,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0
  }
})

//TODO remove after vue-lazyload 1.3.2 is actually published
Vue.use({
  install() {
    Vue.prototype.destroy = Vue.prototype.$destroy
  }
})
