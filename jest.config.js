module.exports = {
  name: 'be-boilerplate',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/**/models/**/index.js',
    '!**/**/models/**/getProperties.js',
    '!**/**/config/**',
    '!src/app.js',
    '!**/helpers/initSentry/index.js',
    '!**/helpers/setupShutdown/index.js',
    '!**/helpers/initMongoDB/index.js',
    '!**/**/middlewares/requestLogger/index.js',
    '!**/**/middlewares/sentryMiddleware/index.js'
  ],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['scripts', 'routes'],
  testMatch: ['**/**/**/*.test.js'],
  coverageDirectory: './coverage',
  clearMocks: true,
  restoreMocks: true,
  reporters: ['default', 'jest-sonar']
}
