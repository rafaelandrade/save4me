const batata = require('../../../src/services/saveForMeService/batata')

jest.setTimeout(100000)

describe('[logger] Test case', () => {
  it('Should log all severity and beautify', async () => {
    const response = await batata()
    expect(response).toBe(1)
  })
})
