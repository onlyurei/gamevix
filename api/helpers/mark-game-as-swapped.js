module.exports = {
  friendlyName: 'Mark a game as swapped',
  description: 'add owner to pastOwners, change futureOwner to owner, clear futureOwner',
  inputs: {
    id: {
      type: 'string',
      description: 'id of the UserGame to mark',
      required: true
    }
  },
  async fn(inputs, exits) {
    try {
      const userGame = await UserGame.findOne(inputs.id).populate('pastOwners')
      if (userGame) {
        if (!userGame.futureOwner) {
          return exits.error(
            new Error(`futureOwner is null: ${JSON.stringify(userGame)}`)
          )
        }
        if (!userGame.pastOwners.some(pastOwner => pastOwner.id === userGame.owner)) {
          await UserGame.addToCollection(userGame.id, 'pastOwners', userGame.owner)
        }
        return exits.success(
          await UserGame.update({ id: userGame.id }).set({
            owner: userGame.futureOwner,
            futureOwner: null
          })
        )
      } else {
        return exits.error(new Error('Not found'))
      }
    } catch (e) {
      return exits.error(new Error(e))
    }
  }
}
