require('dotenv').config()
const throng = require('throng')
const cors = require('cors')
const http = require('http')
const httpContext = require('express-http-context')
const express = require('express')
const initSentry = require('./helpers/initSentry')
const setupShutdown = require('./helpers/setupShutdown')
const sentryMiddleware = require('./app/middlewares/sentryMiddleware')
const { environment, webConcurrency, PORT } = require('./config/keys')

const isProduction = environment === 'production'
const port = PORT || 5001
const WORKERS = webConcurrency || 1

function start() {
  const app = express()
  const server = http.createServer(app)

  app.use(cors('*'))
  app.use(express.json({}))
  app.use(express.urlencoded({ extended: true }))
  app.use(httpContext.middleware)
  app.use(sentryMiddleware)

  require('./app/middlewares/requestLogger')(app)
  require('./app/middlewares/responseTimeMiddleware')(app)
  require('./routes')(app)

  server.listen(port, () => {
    console.log(`We are live on ${port}`)
    console.log(`Environment: ${environment}`)
  })

  initSentry(app)
  isProduction && process.on('SIGTERM', setupShutdown).on('SIGINT', setupShutdown)
}

throng({ worker: start, lifetime: Infinity, count: Number(WORKERS) })
