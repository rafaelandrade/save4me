module.exports = {
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV,
  authTokens: {
    adminToken: process.env.PRODUCTION_ADMIN_TOKEN,
  },
  coralogix: {
    privateKey: process.env.CORALOGIX_PRIVATE_KEY,
  },
}
