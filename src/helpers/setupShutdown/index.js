/**
 * @description Will setup a shutdown timer in order to
 * enforce a graceful shutdown between machines
 * @param {Object} signal
 */
const shutdown = signal => {
  const shutdownTimeout = 25 * 1000
  console.log(`[shutdown] shutting down in ${shutdownTimeout}ms | signal: ${signal}`)

  setTimeout(() => {
    console.log(`waited ${shutdownTimeout}ms, exiting.`)
    process.exit(0)
  }, shutdownTimeout)
}

module.exports = shutdown
