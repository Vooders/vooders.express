process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const Supertest = require('supertest')
const Gen = require('verify-it').Gen

const app = require('../app')

chai.use(chaiHttp)
chai.should()

describe('Routes', () => {
  const supertest = Supertest(app)

  describe('index', () => {
    const indexRoutes = ['/', '/tv']

    indexRoutes.map((path) => {
      it(`should get 200 from ${path}`, (done) => {
        supertest.get(path)
          .expect(200, done)
      })
    })

    it('should get 404 from an invalid path', Gen.string, (done, page) => {
      supertest.get(`/${page}`)
        .expect(404, done)
    })
  })
})
