const chai = require('chai')
const Gen = require('verify-it').Gen
const fs = require('fs')

const ConfigParser = require('../src/ConfigParser')

chai.should()

describe('ConfigParser', () => {
  const genPath = (name) => `generatedFiles/${name}.json`

  const genConfigFile = (path, config) => {
    fs.open(`./${path}`, 'a', (err, fd) => {
      if (err) throw err
      fs.appendFile(fd, JSON.stringify(config), 'utf8', (err) => {
        fs.close(fd, (err) => {
          if (err) throw err
        })
        if (err) throw err
      })
    })
  }

  const removeConfigFile = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err
      console.log(`${path} was deleted`)
    })
  }

  //afterEach(() => removeConfigFile())

  verify.it('should return loaded config from a path', Gen.object, Gen.word, (config, filename) => {
    const parser = new ConfigParser()
    const path = genPath(filename)
    genConfigFile(path, config)
    const result = parser.load(path)
    removeConfigFile(path)
    result.should.eql(config)
  })
})