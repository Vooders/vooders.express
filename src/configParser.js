const fs = require('fs')

const configParser = {
  loadFile (path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  },
  loadObject (path, key) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))[key]
  }
}

module.exports = configParser
