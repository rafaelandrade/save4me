module.exports = (app) => {
  app.use('/v1/health', require('./health'))
}
