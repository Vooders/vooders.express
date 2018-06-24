const fs = require('fs')
const Bluebird = require('bluebird')

class ConfigParser {
  load(path) {
    return Bluebird.resolve(path)
      .then((path) => fs.readFileSync(path, 'utf8'))
      .then((config) => JSON.parse(config))
      .catch((err) => {
        if (err.code === 'ENOENT') throw new Error('invalid config path').code = 500
        else throw new Error('config error')
      }) 
  }
}
module.exports = ConfigParser
