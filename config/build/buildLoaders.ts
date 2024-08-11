import { buildBabelLoader } from './babel/buildBabelLoader'
import { BuildOptions } from './types/types'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ModuleOptions } from 'webpack'
import path from 'path'
import ReactRefreshTypeScript from 'react-refresh-typescript'

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const { mode, paths } = options
  const isDev = mode === 'development'

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  }

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const cssLoaderWithModels = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  }

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModels,
      'sass-loader',
    ],
    exclude: /node_modules/,
  }

  const tsLoader = {
    test: /\.tsx?/,
    use: {
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),
        transpileOnly: isDev,
      },
    },
    exclude: /node_modules/,
  }

  // const babelLoader = buildBabelLoader(options)

  return [
    sassLoader,
    tsLoader,
    // babelLoader,
    assetsLoader,
    svgrLoader,
  ]
}
