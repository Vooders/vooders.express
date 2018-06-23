const chai = require('chai')

chai.should()

describe('Routes', () => {
  describe('indexRouter', () => {
    it('should run the tests', () => {
      const num = 1;
      num.should.eql(1)
    })
  })
})
