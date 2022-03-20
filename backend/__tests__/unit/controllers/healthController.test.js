const { healthController } = require('../../../src/controllers')
const { res, req } = require('../../mocks').mockExpress
const keys = require('../../../src/config/keys')

jest.mock('../../../src/helpers/errorHandler')

describe('[healthController] test case', () => {
  it('Should return status 200 and error false', () => {
    const token = 'admin'
    keys.authTokens.adminToken = token
    req.headers.authorization = token

    healthController(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ error: false, message: 'OK!' })
  })
})
