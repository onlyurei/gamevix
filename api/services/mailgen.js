const Mailgen = require('mailgen')

const mailgen = new Mailgen({
  theme: 'default',
  product: {
    name: 'GameVix',
    link: 'https://www.gamevix.com'
  }
})

module.exports = mailgen
