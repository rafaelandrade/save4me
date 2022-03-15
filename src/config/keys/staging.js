module.exports = {
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY,
  mongoURI: process.env.STAGING_MONGO_URI,
  sentryDNS: process.env.STAGING_SENTRY_DNS,
  authTokens: {
    adminToken: process.env.STAGING_ADMIN_FULL_TOKEN,
    healthToken: process.env.STAGING_HEALTH_TOKEN
  },
  coralogixKey: process.env.STAGING_CORALOGIX_KEY,
}
