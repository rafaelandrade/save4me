const crypto = require('crypto')

const generateRandomId = crypto.randomUUID()
module.exports = generateRandomId
