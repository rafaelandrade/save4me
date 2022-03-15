const faker = require('faker')
const { requireHealthToken } = require('../../../src/app/middlewares')
const { next, res, req } = require('../../mocks').mockExpress
const keys = require('../../../src/config/keys')
const { authorizationErrors } = require('../../../src/app/constants/errorTextConstants')

const { invalidToken } = authorizationErrors

jest.mock('../../../src/helpers/errorHandler', () => jest.fn())
jest.mock('../../../src/config/keys')

describe('[requireHealthToken] test case', () => {
  it('Should call res with status 401 and and UnauthorizedError if no auth is provided', async () => {
    keys.authTokens.healthToken = faker.datatype.uuid()
    req.headers.authorization = undefined
    await requireHealthToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: true, message: invalidToken })
  })

  it('Should call res with status 401 and and UnauthorizedError if authorization is provided but is invalid', async () => {
    req.headers.authorization = '123'
    keys.authTokens.healthToken = faker.datatype.uuid()

    await requireHealthToken(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: true, message: invalidToken })
  })

  it('Should call next for a valid token', async () => {
    const token = faker.datatype.uuid()
    keys.authTokens.healthToken = token
    req.headers.authorization = token
    await requireHealthToken(req, res, next)
    expect(next).toBeCalled()
  })
})
