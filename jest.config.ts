import type { Config } from 'jest'
import path from 'path'

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  rootDir: '.',
  moduleDirectories: [
    'node_modules',
    'src',
    'shared',
    'app',
    'pages',
    'features',
  ],
  moduleNameMapper: {
    '^@app/(.*)$': path.resolve(__dirname, 'src/app/$1'),
    '^@pages/(.*)$': path.resolve(__dirname, 'src/pages/$1'),
    '^@shared/(.*)$': path.resolve(__dirname, 'src/shared/$1'),
    '^@features/(.*)$': path.resolve(__dirname, 'src/features/$1'),
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/svg.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(css|scss)$': 'jest-transform-css',
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  modulePaths: [
    path.resolve(__dirname, 'src/app/$1'),
    path.resolve(__dirname, 'src/pages/$1'),
    path.resolve(__dirname, 'src/shared/$1'),
    path.resolve(__dirname, 'src/features/$1'),
  ],
  transformIgnorePatterns: ['node_modules/(?!(module-to-transform)/)'],
}

export default config
