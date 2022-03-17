module.exports = {
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV,
  authTokens: {
    adminToken: process.env.STAGING_ADMIN_FULL_TOKEN,
  },
}
