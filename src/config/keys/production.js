module.exports = {
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY,
  mongoURI: process.env.PRODUCTION_MONGO_URI,
  sentryDNS: process.env.PRODUCTION_SENTRY_DNS,
  authTokens: {
    adminToken: process.env.PRODUCTION_ADMIN_FULL_TOKEN,
    healthToken: process.env.PRODUCTION_HEALTH_TOKEN
  },
  coralogixKey: process.env.PRODUCTION_CORALOGIX_KEY,
}
