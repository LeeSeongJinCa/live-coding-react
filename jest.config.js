/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.ts(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
