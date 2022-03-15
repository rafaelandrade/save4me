const faker = require('faker')
const { requireAdmin } = require('../../../src/app/middlewares')
const { next, res, req } = require('../../mocks').mockExpress
const { errorTextConstants } = require('../../../src/app/constants')
const TokenService = require('../../../src/app/services/TokenService')
const keys = require('../../../src/config/keys')

const { authorizationErrors } = errorTextConstants

jest.mock('../../../src/app/services/TokenService')
jest.mock('../../../src/config/keys')

describe('[requireAdmin] test case', () => {
  it('Should throw an error for missing authorization', async () => {
    req.headers.authorization = undefined
    await requireAdmin(req, res, next)

    expect(res.status).toBeCalledWith(401)
    expect(res.json).toBeCalledWith({
      error: true,
      errors: [{ name: 'UnauthorizedError', message: authorizationErrors.invalidToken }]
    })
  })

  it('Should call next if the authorization provided match the admin token', async () => {
    const adminToken = faker.datatype.uuid()
    keys.authTokens.adminToken = adminToken
    req.headers.authorization = adminToken

    requireAdmin(req, res, next)
    expect(next).toBeCalledTimes(1)
  })

  it('If the token dont match the admin token will search for an instance of employee token', async () => {
    keys.authTokens.adminToken = faker.datatype.uuid()
    req.headers.authorization = faker.datatype.uuid()

    TokenService.getEmployeeByToken = jest.fn().mockReturnValue({ employee: faker.name.findName(), hasFullAccess: true })

    await requireAdmin(req, res, next)
    expect(next).toBeCalledTimes(1)
    expect(TokenService.getEmployeeByToken).toBeCalledTimes(1)
    expect(req.body).toHaveProperty('adminFullAccess')
  })

  it('If the token dont match the admin token will search for an instance of employee token', async () => {
    TokenService.getEmployeeByToken = jest.fn().mockReturnValue(null)
    req.headers.authorization = faker.datatype.uuid()

    await requireAdmin(req, res, next)
    expect(TokenService.getEmployeeByToken).toBeCalledTimes(1)
    expect(res.status).toBeCalledWith(401)
    expect(res.json).toBeCalledWith({
      error: true,
      errors: [{ name: 'UnauthorizedError', message: authorizationErrors.invalidToken }]
    })
  })
})
