const shippo = require('../services/shippo')

const states = require('../../common/configs/states')
const countries = require('../../common/configs/countries')

const unsafeAttributes = ['shippoAddressId']

module.exports = {
  attributes: {
    fullName: {
      type: 'string',
      required: true,
      maxLength: 70
    },
    addressLine1: {
      type: 'string',
      required: true,
      maxLength: 60
    },
    addressLine2: {
      type: 'string',
      maxLength: 60
    },
    city: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    state: {
      type: 'string',
      required: true,
      maxLength: 2,
      isIn: states
    },
    postalCode: {
      type: 'string',
      required: true,
      maxLength: 20
    },
    country: {
      type: 'string',
      defaultsTo: 'US',
      maxLength: 2,
      isIn: countries
    },
    phoneNumber: {
      type: 'string',
      required: true,
      maxLength: 20
    },
    owner: {
      model: 'user',
      unique: true
    },
    shippoAddressId: {
      type: 'string'
    },
    isComplete: {
      type: 'boolean'
    },
    longitude: {
      type: 'number'
    },
    latitude: {
      type: 'number'
    },
    isResidential: {
      type: 'boolean'
    }
  },

  exposeAttributes: true,
  unsafeAttributes,

  beforeCreate: validateAddress,
  beforeUpdate: validateAddress,

  afterUpdate: removeAvailableForSwap,
  async afterDestroy(address, cb) {
    await removeAvailableForSwap(address, cb, true)
  },

  customToJSON() {
    return Object.assign({}, _.omit(this, unsafeAttributes))
  }
}

async function validateAddress(address, cb) {
  const {
    fullName: name,
    addressLine1: street1,
    addressLine2: street2,
    city,
    state,
    postalCode: zip,
    country,
    phoneNumber: phone
  } = address

  const res = await shippo.address.create({
    name,
    street1,
    street2,
    city,
    state,
    zip,
    country,
    phone,
    validate: true
  })

  if (res && res.validation_results) {
    sails.log.silly(JSON.stringify(res, null, 2))
    if (res.validation_results.is_valid) {
      const {
        object_id: shippoAddressId,
        is_complete: isComplete,
        street1: addressLine1,
        street2: addressLine2,
        city, //eslint-disable-line no-shadow
        state, //eslint-disable-line no-shadow
        zip: postalCode,
        longitude,
        latitude,
        is_residential: isResidential
      } = res
      Object.assign(address, {
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        shippoAddressId,
        isComplete,
        longitude,
        latitude,
        isResidential
      })
      return cb()
    }
    return cb(res.validation_results.messages.map(message => message.text).join('\n'))
  }
  return cb('Could not validate address.')
}

async function removeAvailableForSwap(address, cb, destroy = false) {
  if ((!address.isComplete || destroy) && address.owner) {
    try {
      const availableForSwapGames = await UserGame.find({
        availableForSwap: true,
        owner: address.owner,
        futureOwner: null
      })
      await Promise.all(
        availableForSwapGames.map(async availableForSwapGame => {
          const { id } = availableForSwapGame
          return await UserGame.update({ id }, { availableForSwap: false })
        })
      )
    } catch (e) {
      cb(e.message)
    }
  }
  cb()
}
