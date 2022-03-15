const sentryMiddleware = require('../../../src/app/middlewares/sentryMiddleware')

describe('[sentryMiddleware] test case', () => {
  it('should be an instance of Function', () => {
    expect(sentryMiddleware).toBeInstanceOf(Function)
  })
})
