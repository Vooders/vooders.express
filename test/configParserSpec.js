const Bluebird = require('bluebird')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Gen = require('verify-it').Gen
const fs = require('fs')
const configParser = require('../src/configParser')
const Path = require('path')

chai.use(chaiAsPromised)
chai.should()

describe('ConfigParser', () => {
  const CONFIG_PATH = 'src/config'
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

  describe('loadFile', () => {
    verify.it('should return loaded config from a given path', Gen.object, (config) => {
      const path = genPath()
      return Bluebird.resolve()
        .then(() => writeConfigFile(path, config))
        .then(() => configParser.loadFile(path))
        .then((result) => result.should.eql(config))
        .finally(() => {
          removeConfigFile(path)
        })
    })
  })
  
  describe('loadObject', () => {
    verify.it('should load an object from a given key & path', Gen.object, Gen.word, (data, key) => {
      const path = genPath()
      return Bluebird.resolve()
        .then(() => writeConfigFile(path, { [key]: data }))
        .then(() => configParser.loadObject(path, key))
        .then((result) => result.should.eql(data))
        .finally(() => {
          removeConfigFile(path)
        })
    })
  })

  describe('loads config files', () => {
    fs.readdirSync(CONFIG_PATH).map((file) => {
      describe(`${file}`, () => {
        let configPath = Path.join(CONFIG_PATH, file)
        it(`should load`, () => {
          configParser.loadFile(configPath).should.eql(require(`../${configPath}`))
        })
        it(`should be an object`, () => {
          configParser.loadFile(configPath).should.be.an('Object')
        })
      })
    })
  })
})
