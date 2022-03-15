const Sentry = require('@sentry/node')

module.exports = (err, req, res, next) => {
  console.error('[app use err] ----> ')
  Sentry.captureException(err)
  if (err && err.stack) {
    console.error(err.stack)
  } else {
    console.error(err)
  }
  res.status(500).json({ error: true })
}
