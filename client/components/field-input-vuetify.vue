<template>
  <v-text-field
    v-model="value"
    v-bind="{ disabled, rules, type }"
    :append-icon="
      schema.inputType === 'password' ? (visible ? 'visibility_off' : 'visibility') : ''
    "
    :append-icon-cb="() => (visible = !visible)"
    :hint="schema.hint"
    :placholder="schema.placeholder"
    :required="schema.required"
    :min="schema.min"
    :max="schema.max"
    :minlength="schema.minLength"
    :maxlength="schema.maxLength"
    class="field-input-vuetify"
  />
</template>

<script>
import { pick } from 'lodash'
import { abstractField } from 'vue-form-generator/dist/vfg-core.js'
import validators from '../utils/validators'

export default {
  mixins: [abstractField],
  data() {
    return {
      visible: this.schema.inputType !== 'password'
    }
  },
  computed: {
    rules() {
      return Object.values(pick(validators, this.schema.validators))
    },
    type() {
      return this.schema.inputType === 'password' && this.visible
        ? 'text'
        : this.schema.inputType
    }
  },
  methods: {
    formatValueToModel: value => value
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
.field-input-vuetify
  padding 0 0 10px
</style>
