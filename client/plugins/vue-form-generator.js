import Vue from 'vue'
import 'vue-form-generator/dist/vfg-core.css'
import VueFormGenerator from 'vue-form-generator/dist/vfg-core.js'
// register custom fields
import fieldInputVuetify from '../components/field-input-vuetify.vue'
import fieldSelectVuetify from '../components/field-select-vuetify.vue'

Vue.component('fieldInputVuetify', fieldInputVuetify)
Vue.component('fieldSelectVuetify', fieldSelectVuetify)

Vue.use(VueFormGenerator)
