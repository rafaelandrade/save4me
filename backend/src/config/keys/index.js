const { NODE_ENV } = process.env

switch (NODE_ENV) {
  case 'test':
    module.exports = require('./staging')
    break
  case 'staging':
    module.exports = require('./staging')
    break
  case 'production':
    module.exports = require('./production')
    break
  default:
    module.exports = require('./staging')
    break
}
