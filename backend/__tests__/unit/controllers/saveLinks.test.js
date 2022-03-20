const { BodyPropertyError } = require('errors-stack')
const { saveForMeController } = require('../../../src/controllers')
const { res, req } = require('../../mocks').mockExpress
// const errorHandler = require('../../../src/helpers/errorHandler')

// jest.mock('../../../src/helpers/errorHandler')

describe('[healthController] test case', () => {
  it('Should throw a error in case of not send email in body', async () => {
    req.body = { email: null }
    try {
      await saveForMeController.save(req, res)
    } catch (error) {
      // expect(error).toBeTruthy()
      expect(error.message).toBe('a')
    }
  })
})
