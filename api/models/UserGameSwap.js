module.exports = {
  attributes: {
    owner: {
      model: 'userGame'
    },
    status: {
      type: 'string',
      enum: [
        'waitingForMatch',
        'matched',
        'paymentCharged',
        'shippingLabelCreated',
        'shipped',
        'neverShipped',
        'delivered',
        'lostInShipping',
        'disputed',
        'completed'
      ],
      defaultsTo: 'waitingForMatch'
    },
    envelope: {
      collection: 'userGameSwapEnvelope',
      via: 'owner'
    }
  }
}
