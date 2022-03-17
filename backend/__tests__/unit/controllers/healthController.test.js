const { healthController } = require('../../../src/controllers')
const { res, req } = require('../../mocks').mockExpress
const keys = require('../../../src/config/keys')

jest.mock('../../../src/helpers/errorHandler')

describe('[healthController] test case', () => {
  it('Should return status 200 and error false', async () => {
    const token = 'admin'
    keys.authTokens.adminToken = token
    req.headers.authorization = token
    const response = await healthController(req, res)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({ error: false, message: 'OK!' })
  })
})
