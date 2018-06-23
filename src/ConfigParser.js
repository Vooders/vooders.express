class ConfigParser {
  load(path) {
    return require(path)
  }
}
module.exports = ConfigParser
