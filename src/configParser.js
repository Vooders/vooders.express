const fs = require('fs')

const configParser = {
  load (path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  }
}

module.exports = configParser