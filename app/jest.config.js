module.exports = {
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/tests/styleMock.js',
    '^(utils|modules)/(.*)': '<rootDir>/src/$1/$2',
  },
  setupFiles: ['<rootDir>/tests/setup.js'],
};
