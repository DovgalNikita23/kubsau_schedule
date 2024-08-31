import type { Config } from 'jest'
import path from 'path'

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  rootDir: '.',
  moduleDirectories: ['node_modules', 'src', 'shared', 'app', 'pages'],
  moduleNameMapper: {
    '^@app/(.*)$': path.resolve(__dirname, 'src/app/$1'),
    '^@pages/(.*)$': path.resolve(__dirname, 'src/pages/$1'),
    '^@shared/(.*)$': path.resolve(__dirname, 'src/shared/$1'),
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
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
  ],
}

export default config
