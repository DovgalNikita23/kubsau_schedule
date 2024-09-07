import { Configuration, DefinePlugin } from 'webpack'
import { BuildOptions } from './types/types'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyPlugin from 'copy-webpack-plugin'
// import ESLintPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { mode, paths, platfrom } = options
  const isDev = mode === 'development'

  const Plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      __PLATFROM__: JSON.stringify(platfrom),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(paths.public, 'locales'),
          to: `${path.resolve(paths.output)}/locales`,
        },
        {
          from: `${path.resolve(paths.public)}/netlify.toml`,
          to: `${path.resolve(paths.output)}/netlify.toml`,
        },
      ],
    }),
  ]

  if (isDev) {
    Plugins.push(
      new BundleAnalyzerPlugin(),
      new ReactRefreshWebpackPlugin()
      // new ESLintPlugin({
      //   extensions: ['js', 'mjs', 'cjs', 'ts', 'jsx', 'tsx'],
      //   exclude: 'node_modules',
      // })
    )
  } else {
    Plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    )
  }

  return Plugins
}
