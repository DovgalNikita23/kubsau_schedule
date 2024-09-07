import { BuildOptions } from './types/types'
import { Configuration } from 'webpack'

export function buildResolvers(
  options: BuildOptions
): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
      '@app': `${options.paths.src}/app`,
      '@pages': `${options.paths.src}/pages`,
      '@shared': `${options.paths.src}/shared`,
      '@features': `${options.paths.src}/features`,
      '@widgets': `${options.paths.src}/widgets`,
    },
  }
}
