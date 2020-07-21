import jm from 'json-mapper'
import { startCase } from 'lodash'

const nameMatchingValidators = [
  'isCreditCard',
  'isEmail',
  'isInteger',
  'isNumber',
  'isString',
  'isURL'
]
const nameMatchingInputTypes = ['number', 'password']

const converter = jm.makeConverter({
  type: attr => {
    if (attr.validations && attr.validations.isIn) {
      return 'select-vuetify'
    }
    switch (attr.type) {
      case 'string':
        return 'input-vuetify'
      case 'number':
        return 'input-vuetify' //TODO use a numeric slider
      case 'boolean':
        return 'checkbox'
      default:
        return 'input-vuetify'
    }
  },
  inputType: attr => {
    if (nameMatchingInputTypes.indexOf(attr.type) >= 0) {
      return attr.type
    } else if (attr.validations && attr.validations.isHexColor) {
      return 'color'
    } else if (attr.validations && attr.validations.isEmail) {
      return 'email'
    } else {
      return undefined
    }
  },
  label: attr => attr.label || startCase(attr.key),
  model: 'key',
  required: 'required',
  default: 'defaultsTo',
  validators: attr => {
    let validators = Object.keys(attr.validations || {}).map(key => {
      const value = attr.validations[key]
      if (value) {
        if (nameMatchingValidators.indexOf(key) >= 0) {
          return key.replace('is', '').replace(/\b\w/g, l => l.toLowerCase())
        } else if (key === 'regex') {
          return 'regexp'
        } else if (key === 'isAfter' || key === 'isBefore') {
          return 'date'
        }
      }
    })
    if (attr.required) {
      validators.push('required')
    }
    if (attr.key === 'password') {
      validators.push('password')
    }
    validators = validators.filter(validator => !!validator)
    return validators.length ? validators : undefined
  },
  min: attr => attr.validations && (attr.validations.min || attr.validations.isAfter),
  max: attr => attr.validations && (attr.validations.max || attr.validations.isBefore),
  minLength: attr => attr.validations && attr.validations.minLength,
  maxLength: attr => attr.validations && attr.validations.maxLength,
  pattern: 'validations.regex',
  values: attr => (attr.validations && attr.validations.isIn) || undefined
})

export default function(sailsModel) {
  let fields = []
  if (sailsModel && typeof (sailsModel === 'object')) {
    fields = Object.keys(sailsModel).map(key =>
      converter({ ...sailsModel[key], ...{ key } })
    )
  }
  return { fields }
}
