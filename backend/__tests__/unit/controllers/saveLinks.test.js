const { saveForMeController } = require('../../../src/controllers')
const saveForMeService = require('../../../src/services/saveForMeService/index')
const { res, req } = require('../../mocks').mockExpress
const errorHandler = require('../../../src/helpers/errorHandler')

jest.mock('../../../src/helpers/errorHandler')
jest.mock('../../../src/services/saveForMeService/index')

describe('[healthController] test case', () => {
  it('Should called saveForMeService service', async () => {
    req.body = { email: 'test@email.com', data: {}, service: 'create' }
    saveForMeService.mockReturnValue({})

    await saveForMeController.save(req, res)

    expect(saveForMeService).toBeCalled()
    expect(saveForMeService).toBeCalledWith({ email: 'test@email.com', data: {}, service: 'create' })
    expect(errorHandler).not.toBeCalled()
  })

  it('Should called saveForMeService service', async () => {
    req.body = { email: 'test@email.com', data: {}, service: 'create' }
    saveForMeService.mockRejectedValue()

    await saveForMeController.save(req, res)

    expect(saveForMeService).toBeCalled()
    expect(saveForMeService).toBeCalledWith({ email: 'test@email.com', data: {}, service: 'create' })
    expect(errorHandler).toBeCalled()
  })
})
