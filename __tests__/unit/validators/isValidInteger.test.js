const { isValidInteger } = require('../../../src/app/validators')

describe('isValidInteger', () => {
  it('Should return true to a valid integer', function() {
    const result = isValidInteger({ integer: 123 })
    expect(result).toBe(true)
  })

  it('Should return true to a string as long is an integer', function() {
    const result = isValidInteger({ integer: '123' })
    expect(result).toBe(true)
  })

  it('Should return false to a string that is not integer', function() {
    const result = isValidInteger({ integer: 'fadkoakd' })
    expect(result).toBe(false)
  })

  it('Should return false to a string thats is a combination of integer and letters', function() {
    const result = isValidInteger({ integer: '123cas' })
    expect(result).toBe(false)
  })

  it('Should return false to null or undefined', function() {
    const testNull = isValidInteger({ integer: null })
    const testUndefined = isValidInteger({ integer: undefined })
    expect(testNull).toBe(false)
    expect(testUndefined).toBe(false)
  })
})
