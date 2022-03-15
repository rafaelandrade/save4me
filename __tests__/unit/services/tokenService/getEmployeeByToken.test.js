const faker = require('faker')
const { getEmployeeByToken } = require('../../../../src/app/services/TokenService')
const mongooseModels = require('../../../../src/app/mongooseModels')

jest.mock('../../../../src/app/mongooseModels')

describe('[getEmployeeByToken] test case', () => {
  it('Should return null to a invalid token', async () => {
    // @ts-ignore
    mongooseModels.OperationToken.findOne.mockReturnValue({ select: jest.fn(() => null) })
    const token = faker.datatype.uuid()

    const result = await getEmployeeByToken(token)
    expect(result).toBeFalsy()
  })

  it('For a valid employee token should return two properties, employee and hasFullAccess', async () => {
    const employee = faker.name.firstName()
    const hasFullAccess = faker.name.firstName()

    // @ts-ignore
    mongooseModels.OperationToken.findOne.mockReturnValue({
      select: jest.fn(() => {
        const model = { employee, hasFullAccess }
        return {
          get: property => model[property]
        }
      })
    })

    const token = faker.datatype.uuid()

    const result = await getEmployeeByToken(token)
    expect(result).toHaveProperty('employee', employee)
    expect(result).toHaveProperty('hasFullAccess', hasFullAccess)
  })
})
