const Bluebird = require('bluebird')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Gen = require('verify-it').Gen
const fs = require('fs')
const configParser = require('../src/configParser')

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
    const path = genPath()

    return Bluebird.resolve()
      .then(() => writeConfigFile(path, config))
      .then(() => configParser.load(path))
      .then((result) => result.should.eql(config))
      .finally(() => {
        removeConfigFile(path)
      })
  })
})
