let summarize = null
if (process.server) {
  const { promisify } = require('es6-promisify')
  const SummaryTool = require('node-summary')
  summarize = promisify(SummaryTool.summarize)
}

export default summarize
