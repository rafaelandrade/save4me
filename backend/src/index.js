require('dotenv/config')

const express = require('express')
const cors = require('cors')
const { TooManyRequestsError } = require('errors-stack')
const Sentry = require('@sentry/node')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const logger = require('./services/logger')

const app = express()

const { PORT = 4003, SENTRY_DSN } = process.env

Sentry.init({ dsn: SENTRY_DSN })

app.use(express.json())
app.use(
  // @ts-expect-error
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 400,
    handler: () => {
      throw new TooManyRequestsError('To many request!')
    },
  }),
)
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(helmet.hidePoweredBy())

app.use(Sentry.Handlers.requestHandler())

require('./routes')(app)

app.use(Sentry.Handlers.errorHandler())

app.listen(PORT, () => logger.print({ severity: 'info', event: 'AppListen', message: `We are live on ${PORT}` }))
