<template>
  <div>
    <h3 v-if="formName" class="text-xs-center mt-4 mb-0">
      {{ formName }}
    </h3>
    <v-form ref="form" lazy-validation class="mt-3" @submit.prevent="submit">
      <vue-form-generator v-bind="{ schema, model, options }" />
      <v-dialog
        v-if="destroyAction && model.id"
        v-model="dialog"
        max-width="400"
        lazy
        persistent
      >
        <v-btn slot="activator" color="error" small icon class="ma-0">
          <v-icon>delete_forever</v-icon>
        </v-btn>
        <v-card>
          <v-card-title class="headline">
            Delete
          </v-card-title>
          <v-card-text class="subheading">
            Are you sure?
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">
              Cancel
            </v-btn>
            <v-btn
              color="error"
              flat="flat"
              @click.native="
                dialog = false
                update(destroyAction)
              "
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="text-xs-center">
        <v-btn :disabled="updating" color="primary" large dark type="submit">
          Update
        </v-btn>
      </div>
    </v-form>
    <v-snackbar v-model="success" color="success">
      {{ updateSuccessMessage }}
    </v-snackbar>
    <v-snackbar v-model="error" color="error">
      {{ updateErrorMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { camelCase, cloneDeep } from 'lodash'
import { asyncData, data } from '../utils/adapters/form'
import formUpdating from '../utils/mixins/form-updating'

export default {
  mixins: [formUpdating],
  props: {
    formName: { type: String, default: '' },
    fields: { type: Array, required: true },
    additionalSchema: { type: Object, default: () => {} },
    modelName: { type: String, required: true },
    storeStatePath: { type: String, default: '' },
    getAction: { type: Function, required: true },
    updateAction: { type: Function, required: true },
    destroyAction: { type: Function, default: null },
    updateSuccessMessage: { type: String, default: 'Successfully updated.' },
    updateErrorMessage: { type: String, default: 'Failed to update, please try again.' }
  },
  data() {
    return {
      schema: {},
      ...data(this.fields)(),
      success: false,
      error: false,
      dialog: false
    }
  },
  async created() {
    await this.getAction()
    this.updateFormModelFromStore()
    const { schema } = await asyncData(
      this.modelName,
      this.fields,
      this.additionalSchema
    )({
      app: this
    })
    this.schema = schema
  },
  methods: {
    updateFormModelFromStore() {
      const camelCaseModelName = camelCase(this.modelName)
      this.model = cloneDeep(
        this.storeStatePath
          ? this.$store.state[this.storeStatePath][camelCaseModelName]
          : this.$store.state[camelCaseModelName]
      )
    },
    submit() {
      this.update(this.updateAction)
    },
    async update(action) {
      try {
        this.updating = true
        await action(this.model)
        this.updateFormModelFromStore()
        this.$refs.form.reset()
        this.success = true
      } catch (e) {
        this.error = true
      } finally {
        this.updating = false
      }
    }
  }
}
</script>
