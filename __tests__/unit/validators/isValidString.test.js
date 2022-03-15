const { isValidString } = require('../../../src/app/validators')

describe('isValidString', () => {
  it('Should return true to a valid string', function() {
    const result = isValidString({ string: 'check' })
    expect(result).toBe(true)
  })

  it('Should return false to null or undefined', function() {
    const testNull = isValidString({ string: null })
    const testUndefined = isValidString({ string: undefined })
    expect(testNull).toBe(false)
    expect(testUndefined).toBe(false)
  })

  it('Should return false for anything thats not a string', function() {
    // @ts-ignore
    const testInteger = isValidString({ string: 123 })
    // @ts-ignore
    const testArray = isValidString({ string: [123] })
    // @ts-ignore
    const testFloat = isValidString({ string: 3.2 })

    expect(testInteger).toBe(false)
    expect(testArray).toBe(false)
    expect(testFloat).toBe(false)
  })

  it('Should return true for a string that dont match max string length  provided', function() {
    const testInteger = isValidString({ string: 'four', maxLength: 4 })
    expect(testInteger).toBe(true)
  })

  it('Should return false for a string that dont match max string length provided', function() {
    const testInteger = isValidString({ string: 'four', maxLength: 2 })
    expect(testInteger).toBe(false)
  })

  it('Should return true for a string that match the fixedLength provided', function() {
    const testInteger = isValidString({ string: 'four', fixedLength: 4 })
    expect(testInteger).toBe(true)
  })

  it('Should return false for a string that dont match the fixedLength provided', function() {
    const testInteger = isValidString({ string: 'four', fixedLength: 5 })
    expect(testInteger).toBe(false)
  })
})
