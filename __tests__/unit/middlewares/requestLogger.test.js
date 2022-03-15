const requestLogger = require('../../../src/app/middlewares/requestLogger')

describe('[requestLogger] test case', () => {
  it('should be an instance of Function', () => {
    expect(requestLogger).toBeInstanceOf(Function)
  })
})
