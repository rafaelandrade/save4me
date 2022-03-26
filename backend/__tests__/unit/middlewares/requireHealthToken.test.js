const { requireToken } = require('../../../src/middlewares')
const { next, res, req } = require('../../mocks').mockExpress
const keys = require('../../../src/config/keys')

jest.mock('../../../src/helpers/errorHandler', () => jest.fn())
jest.mock('../../../src/config/keys')

describe('[requireToken] test case', () => {
  it('Should call res with status 401 and and UnauthorizedError if no auth is provided', async () => {
    keys.authTokens.adminToken = 'admin'
    await requireToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'Invalid health token' })
  })

  it('Should call res with status 401 and and UnauthorizedError if authorization is provided but is invalid', async () => {
    req.headers.authorization = '123'
    keys.authTokens.adminToken = '12131'

    await requireToken(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: true, message: 'Invalid health token' })
  })

  it('Should call next for a valid token', async () => {
    const token = 'admin'
    keys.authTokens.adminToken = token
    req.headers.authorization = token
    await requireToken(req, res, next)
    expect(next).toBeCalled()
  })
})
