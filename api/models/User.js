/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const sailAuthUserModel = require('sails-auth/api/models/User')
const uuid = require('uuid/v4')
const sendEmailVerification = require('../emails/transactional/email-verification')

const unsafeAttributes = ['emailToken']
const immutableAttributes = unsafeAttributes.concat([
  'username',
  'createdAt',
  'updatedAt'
])

_.merge(sailAuthUserModel, {
  attributes: {
    firstName: {
      type: 'string',
      maxLength: 35
    },
    lastName: {
      type: 'string',
      maxLength: 35
    },
    address: {
      collection: 'address',
      via: 'owner'
    },
    platforms: {
      collection: 'userPlatform',
      via: 'owners'
    },
    games: {
      collection: 'userGame',
      via: 'owner'
    },
    futureGames: {
      collection: 'userGame',
      via: 'futureOwner'
    },
    pastGames: {
      collection: 'userGame',
      via: 'pastOwners'
    },
    swapPreferences: {
      collection: 'userSwapPreference',
      via: 'owners'
    },
    emailToken: {
      type: 'string'
    }
  },

  exposeAttributes: true,
  unsafeAttributes,
  immutableAttributes,

  cascadeOnDestroy: true,

  beforeCreate(user, cb) {
    user.emailToken = uuid()
    cb()
  },

  async afterCreate(user, cb) {
    await sendEmailVerification(user)
    cb()
  },

  async beforeUpdate(user, cb) {
    const { email } = user
    if (email) {
      try {
        const existingEmailOwner = await User.findOne({ email })
        if (!existingEmailOwner) {
          const currentUser = await User.findOne(user.id)
          if (currentUser && currentUser.email !== email) {
            user.emailToken = uuid()
            await sendEmailVerification(user)
          }
        }
      } catch (e) {
        sails.log.error(e)
      }
    }
    cb()
  },

  customToJSON() {
    return Object.assign(
      {},
      { emailVerified: this.emailToken === '' },
      _.omit(this, unsafeAttributes)
    )
  }
})

module.exports = sailAuthUserModel
