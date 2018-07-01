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
    it('should get 200 from /', (done) => {
      supertest.get('/')
        .expect(200, done)
    })

    it('should get 200 from /tv', (done) => {
      supertest.get('/tv')
        .expect(200, done)
    })

    it('should get 404 from an invalid path', Gen.string, (page) => {
      supertest.get(`/${path}`)
        .expect(404, done)
    })
  })
})
