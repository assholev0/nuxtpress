module.exports = {
  testEnvironment: 'node',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**'
  ],
  testPathIgnorePatterns: ['test/fixtures/.*/.*?/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'mjs', 'json'],
  expand: true
};
