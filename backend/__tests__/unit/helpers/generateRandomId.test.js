const { randomId } = require('../../../src/helpers')

describe('[randomId] Test case', () => {
  it('Should return an number type', () => {
    const number = randomId
    expect(number).toBeTruthy()
    expect(typeof number).toBe('number')
  })
})
