const sails = require('sails')
const request = require('supertest')

beforeAll(() => {
  return new Promise((resolve, reject) => {
    sails.lift(err => {
      if (err) {
        return reject(err)
      }
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
      global.app = request(sails.hooks.http.app)
      resolve(sails)
    })
  })
})

afterAll(sails.lower)
