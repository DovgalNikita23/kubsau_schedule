import { BuildOptions } from './types/types'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port ?? 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
  }
}
