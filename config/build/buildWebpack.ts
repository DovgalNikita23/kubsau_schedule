import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { BuildOptions } from './types/types'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import webpack from 'webpack'

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options
  const isDev = mode === 'development'

  return {
    mode: options.mode ?? 'development',
    context: paths.context,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev && 'inline-source-map',
    devServer: buildDevServer(options),
  }
}
