import { pick } from 'lodash'
import adapter from './sails-model-to-vue-from-generator-schema'

export function asyncData(modelName, fields, additionalSchema) {
  return async function({ app }) {
    let schema = await app.$axios
      .get(`/models/${modelName}/attributes`)
      .then(res => res.data)
    schema = { ...schema, ...additionalSchema }
    schema = adapter(pick(schema, fields))
    return { schema }
  }
}

export function data(fields) {
  return function() {
    return {
      model: Object.assign(...fields.map(field => ({ [field]: '' }))),
      options: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    }
  }
}
