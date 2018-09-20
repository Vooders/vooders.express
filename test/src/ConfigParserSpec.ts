import * as Bluebird from 'bluebird'
import * as fs from 'fs'
import * as Path from 'path'
import { ConfigParser } from '../../src/ConfigParser'
import { Gen } from 'verify-it'

const configParser = new ConfigParser()

describe('ConfigParser', () => {
  const CONFIG_PATH = 'config'
  const genPath = () => `test/src/generatedFiles/${Gen.word()}.json`

  const writeConfigFile = (path: string, config: object) => {
    const content = JSON.stringify(config)
    fs.writeFileSync(path, content)
  }

  const removeConfigFile = (path: string) => {
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

  describe('Loading Config Files', () => {
    fs.readdirSync(CONFIG_PATH).map((file) => {
      let configPath = Path.join(CONFIG_PATH, file)
      it(`${file} should load`, () => {
        configParser.loadFile(configPath).should.eql(require(`../../../${configPath}`))
      })
      it(`${file} should return an object`, () => {
        configParser.loadFile(configPath).should.be.an('Object')
      })
    })
  })
})
