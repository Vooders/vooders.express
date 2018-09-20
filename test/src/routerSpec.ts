import * as Supertest from 'supertest'
import { Gen } from 'verify-it'
import * as app from '../../app.js'

describe('Routes', () => {
  const supertest = Supertest(app)

  describe('index', () => {
    const indexRoutes = ['/', '/tv']

    indexRoutes.map((path) => {
      verify.it(`should get 200 from ${path}`, (done) => {
        supertest.get(path)
          .expect(200, done)
      })
    })

    verify.it('should get 404 from an invalid path', Gen.string, (page, done) => {
      supertest.get(`/${page}`)
        .expect(404, done)
    })
  })
})
