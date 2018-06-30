process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const Supertest = require('supertest')

const app = require('../app')

chai.use(chaiHttp)
chai.should()

describe('Routes', () => {
  const supertest = Supertest(app)

  describe('index', () => {
    it('/', (done) => {
      supertest.get('/')
        .expect(200, done)
    })

    it('/tv', (done) => {
      supertest.get('/tv')
        .expect(200, done)
    })
  })
})
