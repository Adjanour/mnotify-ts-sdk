import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Test environment
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90
    }
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/examples/',
    '/src/types/',
    '/test/mocks/'
  ],

  // Test patterns
  testMatch: [
    '**/test/**/*.test.ts',
    '**/__tests__/**/*.test.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Transform settings
  transform: {
    '^.+\\.ts$': [
      'ts-jest', 
      {
        // ts-jest configuration
        tsconfig: 'tsconfig.test.json',
      }
    ]
  },

  // Module handling
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // For path aliases
  },

  // Watch options
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/'
  ],

  // Reporting
  verbose: true,
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'test-results' }]
  ],

  // Global setup/teardown
  // globalSetup: '<rootDir>/test/setup.ts',
  // globalTeardown: '<rootDir>/test/teardown.ts',
  // setupFilesAfterEnv: ['<rootDir>/test/setupAfterEnv.ts'],

  // Test timeout
  testTimeout: 10000
};

export default config;