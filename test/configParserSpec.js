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

  verify.it('should return loaded config from a given path', Gen.object, (config) => {
    const path = genPath()

    return Bluebird.resolve()
      .then(() => writeConfigFile(path, config))
      .then(() => configParser.load(path))
      .then((result) => result.should.eql(config))
      .finally(() => {
        removeConfigFile(path)
      })
  })

  const CONFIG_PATH = 'src/config'

  describe('loads config files', () => {
    fs.readdirSync(CONFIG_PATH).map((file) => {
      let configPath = Path.join(CONFIG_PATH, file)
        it(`should load ${file}`, () => {
          configParser.load(configPath).should.eql(require(`../${configPath}`))
        })
    })
  })
})
