const { randomId } = require('../../../src/helpers')

describe('[randomId] Test case', () => {
  it('Should return an string type', () => {
    const id = randomId
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })
})
