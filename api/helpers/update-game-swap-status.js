const { attributes } = require('../models/UserGameSwap')

const statusValues = attributes.status.enum
const statuses = {}
for (const value of statusValues) {
  statuses[value] = value
}

const statusFSM = {
  [statuses.waitingForMatch]: [statuses.matched],
  [statuses.matched]: [statuses.waitingForMatch, statuses.paymentCharged],
  [statuses.paymentCharged]: [statuses.shippingLabelCreated],
  [statuses.shippingLabelCreated]: [statuses.shipped, statuses.neverShipped],
  [statuses.shipped]: [statuses.lostInShipping, statuses.delivered],
  [statuses.neverShipped]: [statuses.disputed],
  [statuses.delivered]: [statuses.completed, statuses.disputed],
  [statuses.lostInShipping]: [statuses.disputed],
  [statuses.disputed]: [statuses.completed],
  [statuses.completed]: []
}

module.exports = {
  friendlyName: 'Update status of a UserGameSwap with validation',

  inputs: {
    owner: {
      type: 'string',
      description: 'UserGame id for the owner of the record.'
    },
    status: {
      type: 'string',
      description: 'Desired status for the record'
    }
  },

  async fn(inputs, exits) {
    const { owner, status } = inputs
    const gameSwap = {
      owner,
      status: 'waitingForMatch'
    }
    const userGameSwap = await UserGameSwap.findOrCreate(gameSwap, gameSwap)
    if (userGameSwap) {
      if (statusFSM[userGameSwap.status].includes(status)) {
        const updatedSwap = await UserGameSwap.update({ owner }, { status })
        return exits.success(updatedSwap[0])
      } else {
        return exits.error('Status not available')
      }
    } else {
      return exits.error(
        'Given UserGame does not have a UserGameSwap record and failed to create one.'
      )
    }
  }
}
