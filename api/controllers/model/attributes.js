const path = require('path')

const SAFE_ATTRIBUTE_OPTIONS = ['type', 'required', 'defaultsTo', 'validations']
const appPath = process.cwd()
const models = {}

module.exports = {
  friendlyName: 'Model Attributes',

  description: 'Expose attributes of models which has exposeAttributes set to true.',

  inputs: {
    model: {
      description: 'name of the model to look up',
      type: 'string',
      required: true
    }
  },

  fn: function(inputs, exits) {
    try {
      if (!models[inputs.model]) {
        models[inputs.model] = require(path.resolve(
          appPath,
          `api/models/${inputs.model}`
        ))
      }
      const model = models[inputs.model]
      if (model.attributes && model.exposeAttributes) {
        const filteredAttributes = _.pickBy(
          _.mapValues(model.attributes, attribute =>
            _.pick(attribute, SAFE_ATTRIBUTE_OPTIONS)
          ),
          filteredAttribute => !_.isEmpty(filteredAttribute)
        )
        return exits.success(
          model.unsafeAttributes && model.unsafeAttributes.length
            ? _.omit(filteredAttributes, model.unsafeAttributes)
            : filteredAttributes
        )
      }
      return this.res.sendStatus(404)
    } catch (e) {
      sails.log.warn(e.message, e.stack)
      return this.res.sendStatus(404)
    }
  }
}
