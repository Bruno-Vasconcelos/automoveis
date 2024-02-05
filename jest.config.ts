
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

require('dotenv').config();

process.env = Object.assign(process.env, {
  NODE_ENV: process.env.JEST_NODE_ENV,
});

export default {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/src/modules/**/**/infra/http/controllers/**/*.ts',
    '<rootDir>/src/modules/**/**/services/**/*.ts',
    '<rootDir>/src/modules/**/**/providers/**/implementations/*.ts',
    '<rootDir>/src/modules/**/**/infra/**/repositories/*.ts',
    '<rootDir>/src/shared/providers/**/implementations/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  globalSetup: '<rootDir>/src/__test__/setup-db.ts',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',

  // setupFilesAfterEnv: ['<rootDir>/src/config/__test__/db-env.ts'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/__test__/*.spec.ts',
    '<rootDir>/src/__test__/**/*.spec.ts',
    '<rootDir>/src/__test__/*.spec.ts',
    '<rootDir>/src/__test__/**/*.spec.ts',
    '<rootDir>/src/__test__/**/**/*.spec.ts'
  ],
};
