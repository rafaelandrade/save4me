const { NODE_ENV } = process.env

const environments = {
  staging: require('./staging'),
  production: require('./production'),
}

module.exports = environments[NODE_ENV] || require('./staging')
