const Bluebird = require('bluebird')
const chai = require('chai')
const Gen = require('verify-it').Gen
const fs = require('fs')

const ConfigParser = require('../src/ConfigParser')

chai.should()

describe('ConfigParser', () => {
  const genPath = () => `test/generatedFiles/${Gen.word()}.json`

  const genConfigFile = (path, config) => {
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
      .then(() => genConfigFile(path, config))
      .then(() => parser.load(path))
      .then((result) => result.should.eql(config))
      .finally(() => {
        removeConfigFile(path)
      })
  })
})