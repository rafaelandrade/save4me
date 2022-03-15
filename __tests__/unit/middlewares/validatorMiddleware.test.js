const { validatorMiddleware } = require('../../../src/app/middlewares')
const errorHandler = require('../../../src/helpers/errorHandler')
const { isValidInteger, isValidString } = require('../../../src/app/validators')
const { next, res, req } = require('../../mocks').mockExpress

jest.mock('../../../src/helpers/errorHandler', () => jest.fn())

describe('[validatorMiddleware] test case', () => {
  it('Should throw an error and call the error handler if some required property is missing', async () => {
    req.body = {}

    const schema = {
      body: {
        stringProperty: {
          type: 'string',
          required: true
        },
        integerProperty: {
          type: 'integer',
          required: true
        }
      }
    }

    // @ts-ignore
    validatorMiddleware(schema)(req, res, next)
    expect(errorHandler).toBeCalledTimes(1)
  })

  it('Should throw an error if the schema passed to the validator is missing the validator function', async () => {
    req.body = {}
    const schema = {
      body: {
        stringProperty: {
          type: 'string',
          required: false
        }
      }
    }

    // @ts-ignore
    validatorMiddleware(schema)(req, res, next)
    expect(errorHandler).toBeCalledTimes(1)
  })

  it('Should run the validator for the provided properties if they exist', async () => {
    req.body = {
      stringProperty: 'this is a string',
      integerProperty: 20
    }

    const schema = {
      body: {
        stringProperty: {
          type: 'string',
          required: true,
          validator: isValidString
        },
        integerProperty: {
          type: 'integer',
          required: true,
          validator: isValidInteger
        }
      }
    }

    validatorMiddleware(schema)(req, res, next)
    expect(errorHandler).toBeCalledTimes(0)
    expect(next).toBeCalledTimes(1)
  })

  it('Should run throw erros for invalid param properties', async () => {
    req.params = { stringProperty: null, integerProperty: 'something' }

    const schema = {
      params: {
        stringProperty: {
          type: 'string',
          required: true,
          validator: isValidString
        },
        integerProperty: {
          type: 'integer',
          required: true,
          validator: isValidString
        }
      }
    }

    validatorMiddleware(schema)(req, res, next)
    expect(errorHandler).toBeCalledTimes(1)
  })

  it('Should run the same validation blocks and logic for params properties', async () => {
    req.params = {
      stringProperty: 'this is a string',
      integerProperty: 20
    }

    const schema = {
      params: {
        stringProperty: {
          type: 'string',
          required: true,
          validator: isValidString
        },
        integerProperty: {
          type: 'integer',
          required: true,
          validator: isValidInteger
        }
      }
    }

    validatorMiddleware(schema)(req, res, next)
    expect(errorHandler).toBeCalledTimes(0)
    expect(next).toBeCalledTimes(1)
  })

  it('Should run the same validation blocks and logic for query properties', async () => {
    req.query = {
      stringProperty: 'this is a string',
      integerProperty: 20
    }

    const schema = {
      query: {
        stringProperty: {
          type: 'string',
          required: true,
          validator: isValidString
        },
        integerProperty: {
          type: 'integer',
          required: true,
          validator: isValidInteger
        }
      }
    }

    validatorMiddleware(schema)(req, res, next)
    expect(errorHandler).toBeCalledTimes(0)
  })
})
