module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['routes', 'config'],
  testMatch: ['**/**/**/*.test.js'],
  setupFiles: ['dotenv/config'],
  restoreMocks: true,
}
