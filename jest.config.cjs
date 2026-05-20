/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 80,
      lines: 80,
      statements: 70,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/examples/"],
  testMatch: ["**/test/**/*.test.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  watchPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
  verbose: true,
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "test-results" }],
  ],
  testTimeout: 10000,
};

module.exports = config;
