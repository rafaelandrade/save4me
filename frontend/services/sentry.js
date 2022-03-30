import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://15f471ba08234c7eb5b410d8b9f633ad@o1183049.ingest.sentry.io/6300099',
  tracesSampleRate: 1.0,
})
