module.exports = {
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV,
  authTokens: {
    adminToken: process.env.STAGING_ADMIN_FULL_TOKEN,
  },
  coralogix: {
    applicationName: process.env.STAGING_APPLICATION_NAME,
    privateKey: process.env.STAGING_PRIVATE_KEY,
    subsystemName: process.env.STAGING_SUBSYSTEM_NAME,
  },
}
