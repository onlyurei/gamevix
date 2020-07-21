const { promisify } = require('es6-promisify')

let summarize
try {
  const SummaryTool = require('node-summary')
  summarize = promisify(SummaryTool.summarize)
} catch (e) {
  //noop
}

module.exports = {
  description: 'Return the key sentences of each paragraph of the text.',

  inputs: {
    text: {
      type: 'string',
      required: true
    }
  },

  async fn(inputs, exits) {
    const { text } = inputs
    try {
      exits.success(await summarize(text))
    } catch (e) {
      sails.log.error(e)
      exits.error()
    }
  }
}
