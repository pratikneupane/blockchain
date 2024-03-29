module.exports = {
    maxConcurrency: 2,
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  