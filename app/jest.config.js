module.exports = {
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: { '\\.(css|less)$': '<rootDir>/tests/styleMock.js' },
  setupFiles: ['<rootDir>/tests/setup.js'],
};
