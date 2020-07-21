module.exports = {
  attributes: {
    owner: {
      model: 'userGameSwap',
      required: true,
      unique: true
    },
    shippoShipment: {
      type: 'json'
    },
    shippoTracking: {
      type: 'json'
    }
  }
}
