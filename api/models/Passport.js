const Passport = require('sails-auth/api/models/Passport')

_.merge(Passport, {
  customToJSON: function() {
    // Return a shallow copy of this record with the password removed.
    return _.omit(this, ['password'])
  }
})

module.exports = Passport
