const logger = require('../../../src/services/logger')

describe('[logger] Test case', () => {
  it('Should log all severity and beautify', () => {
    logger.info({ event: 'test', message: 'Information log' })
    logger.warn({ event: 'test', message: 'Warning log' })
    logger.error({ event: 'test', message: 'Error log' })
    logger.debug({ event: 'test', message: 'Debug log' })

    const json = JSON.stringify({ event: 'test', message: 'Information log' }, undefined, 2)

    expect(logger.beautify({ event: 'test', message: 'Information log' })).toBe(json)
  })
})
