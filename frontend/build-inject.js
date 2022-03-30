const fs = require('fs')
require('dotenv/config')

const baseConfig = {
  baseURL: process.env.BASE_URL,
  headers: {
    authorization: process.env.AUTHORIZATION,
  },
}

fs.writeFileSync('./config/api.json', JSON.stringify(baseConfig, null, 2))
