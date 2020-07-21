<template>
  <v-select
    v-model="value"
    v-bind="{ disabled, rules }"
    :items="schema.values"
    :hint="schema.hint"
    :required="schema.required"
    autocomplete
    class="field-select-vuetify"
  />
</template>

<script>
import { pick } from 'lodash'
import { abstractField } from 'vue-form-generator/dist/vfg-core.js'
import validators from '../utils/validators'

export default {
  mixins: [abstractField],
  computed: {
    rules() {
      return Object.values(pick(validators, this.schema.validators))
    }
  },
  methods: {
    formatValueToModel: value => value
  }
}
</script>
