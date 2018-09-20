const fs = require('fs')

export class ConfigParser {
  loadFile (path: string): object {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  }

  loadObject (path: string, key: string): object {
    return JSON.parse(fs.readFileSync(path, 'utf8'))[key]
  }
}
