const Sentry = require('@sentry/node')
const { UnauthorizedError } = require('errors-stack')
const { errorHandler } = require('../../../src/helpers')
const logger = require('../../../src/services/logger')
const { mockExpress } = require('../../mocks')

const { res } = mockExpress

jest.mock('../../../src/services/logger')
jest.mock('@sentry/node')

describe('[errorHandler] Test case', () => {
  it('Should capture exception, and return the status and message using res', () => {
    const error = new UnauthorizedError({ message: 'Invalid token', status: 401 })

    errorHandler({ res, error })

    expect(Sentry.captureException).toBeCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      errors: [{ name: 'UnauthorizedError', message: 'Invalid token' }],
    })
  })

  it('For an error object that dont have an status property, will call the res using a internal service error and status 500', () => {
    const error = new Error('Random error')
    const exceptionCode = 11123

    Sentry.captureException = jest.fn().mockReturnValue(exceptionCode)

    errorHandler({ res, error })

    expect(Sentry.captureException).toBeCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      errors: [
        {
          name: 'InternalServiceError',
          message: `This is a internal server error, sentry captured exception with id ${exceptionCode}`,
        },
      ],
    })
  })

  it('Should not call res if the value is undefined, but should capture the exception and logger error', () => {
    const error = new UnauthorizedError({ message: 'Invalid token', status: 401 })

    errorHandler({ res: undefined, error })

    expect(Sentry.captureException).toBeCalledTimes(1)
    expect(logger.print).toBeCalledTimes(1)
    expect(res.status).not.toBeCalled()
    expect(res.json).not.toBeCalled()
  })
})
