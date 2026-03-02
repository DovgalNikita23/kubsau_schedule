import { Configuration } from 'webpack'

import { BuildOptions } from './types/types'

export function buildResolvers(
  options: BuildOptions
): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': options.paths.src,
      '@app': `${options.paths.src}/app`,
      '@pages': `${options.paths.src}/pages`,
      '@shared': `${options.paths.src}/shared`,
      '@features': `${options.paths.src}/features`,
      '@widgets': `${options.paths.src}/widgets`,
      '@locales': `${options.paths.public}/locales`,
    },
  }
}
