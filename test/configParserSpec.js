const Bluebird = require('bluebird')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Gen = require('verify-it').Gen
const fs = require('fs')

const ConfigParser = require('../src/ConfigParser')

chai.use(chaiAsPromised)
chai.should()

describe('ConfigParser', () => {
  const genPath = () => `test/generatedFiles/${Gen.word()}.json`

  const writeConfigFile = (path, config) => {
    const content = JSON.stringify(config)
    fs.writeFileSync(path, content)
  }

  const removeConfigFile = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err
    })
  }

  verify.it('should return loaded config from a path', Gen.object, (config) => {
    const parser = new ConfigParser()
    const path = genPath()

    return Bluebird.resolve()
      .then(() => writeConfigFile(path, config))
      .then(() => parser.load(path))
      .then((result) => result.should.eql(config))
      .finally(() => {
        removeConfigFile(path)
      })
  })

  verify.it('should throw config not found error if path is invalid', () => {
    const parser = new ConfigParser()
    const path = genPath()
    parser.load(path).should.eventually.throw(Error('invalid config path'))
  })
})