module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Map KendoReact packages used in tests to lightweight stubs
    '^@progress/kendo-react-(dialogs|editor|dropdowns|inputs|dateinputs|grid|excel-export|scheduler|sortable|charts|notification)$': '<rootDir>/test/kendo-react-stubs.tsx',
    '^@progress/kendo-data-query$': '<rootDir>/test/kendo-react-stubs.tsx',
    '^hammerjs$': '<rootDir>/test/kendo-react-stubs.tsx',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: { react: { runtime: 'automatic' } },
          target: 'es2020',
        },
        module: { type: 'commonjs' },
      },
    ],
  },
};
