const user = {
  createdAt: 1502665385533,
  updatedAt: 1502665385533,
  id: '5990daa99daebb461a5a1484',
  username: 'foobar',
  email: 'foobar@foobar.com',
  firstName: 'foo',
  lastName: 'bar',
  gravatarUrl: 'https://gravatar.com/avatar/5d58606054103162a9739bc0ccdc7fc5'
}

const notFound = { message: 'Error.Passport.Username.NotFound', statusCode: 401 }

const passwordWrong = { message: 'Error.Passport.Password.Wrong', statusCode: 401 }

describe('AuthController', () => {
  describe('POST /login', () => {
    describe('Local Authentication Protocol', () => {
      describe('identity (username) and password matching', () => {
        it('should return 200 with the correct user data', done => {
          app
            .post('/api/auth/local')
            .send({
              identifier: 'foobar',
              password: '12345678'
            })
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              expect(res.body).toEqual(user)
              done()
            })
        })
      })

      describe('identity (email) and password matching', () => {
        it('should return 200 with the correct user data', done => {
          app
            .post('/api/auth/local')
            .send({
              identifier: 'foobar@foobar.com',
              password: '12345678'
            })
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              expect(res.body).toEqual(user)
              done()
            })
        })
      })

      describe('identity not found', () => {
        it('should return 403 with the error data', done => {
          app
            .post('/api/auth/local')
            .send({
              identifier: 'foo',
              password: 'bar'
            })
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              expect(JSON.parse(res.error.status)).toBe(403)
              expect(JSON.parse(res.error.text)).toEqual(notFound)
              done()
            })
        })
      })

      describe('password not matching', () => {
        it('should return 403 with the error data', done => {
          app
            .post('/api/auth/local')
            .send({
              identifier: 'foobar',
              password: 'foobar'
            })
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              expect(JSON.parse(res.error.status)).toBe(403)
              expect(JSON.parse(res.error.text)).toEqual(passwordWrong)
              done()
            })
        })
      })
    })
  })
})
