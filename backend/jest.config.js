module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['routes', 'config'],
  testMatch: ['**/**/**/*.test.js'],
  setupFiles: ['./jest.setup.js'],
  restoreMocks: true,
}
