require('dotenv/config')

const express = require('express')
const cors = require('cors')
const Sentry = require('@sentry/node')

const routes = require('./routes')
const logger = require('./services/logger')

const app = express()

const { PORT = 3000, SENTRY_DSN } = process.env

Sentry.init({ dsn: SENTRY_DSN })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.use(Sentry.Handlers.requestHandler())

app.use(routes)

app.use(Sentry.Handlers.errorHandler())

app.listen(PORT, () => logger.info(`We are live on ${PORT}`))
