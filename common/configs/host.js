module.exports = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://www.gamevix.com'
      : 'http://localhost:8080'
}
