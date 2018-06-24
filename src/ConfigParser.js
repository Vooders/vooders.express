const fs = require('fs')

class ConfigParser {
  load (path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  }
}
module.exports = ConfigParser
