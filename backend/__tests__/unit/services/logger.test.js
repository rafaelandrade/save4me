const logger = require('../../../src/services/logger')

describe('[logger] Test case', () => {
  it('Should log all severity and beautify', () => {
    logger.print({ severity: 'info', event: 'test', message: 'Information log' })
    logger.print({ severity: 'warning', event: 'test', message: 'Warning log' })
    logger.print({ severity: 'error', event: 'test', message: 'Error log' })
    logger.print({ severity: 'debug', event: 'test', message: 'Debug log' })

    const json = JSON.stringify({ event: 'test', message: 'Information log' }, undefined, 2)

    expect(logger.beautify({ event: 'test', message: 'Information log' })).toBe(json)
  })
})
