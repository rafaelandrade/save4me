module.exports = {
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV,
  authTokens: {
    adminToken: process.env.PRODUCTION_ADMIN_TOKEN,
  },
  coralogix: {
    applicationName: process.env.PRODUCTION_APPLICATION_NAME,
    privateKey: process.env.PRODUCTION_PRIVATE_KEY,
    subsystemName: process.env.PRODUCTION_SUBSYSTEM_NAME,
  },
}
