import path from 'path'
import type { StorybookConfig } from '@storybook/react-webpack5'
import webpack from 'webpack'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    // Обработка SCSS файлов
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        'style-loader', // Вставляет стили в DOM через тег <style>
        'css-loader', // Разбирает CSS в JavaScript
        'sass-loader', // Разбирает SCSS в CSS
      ],
      include: path.resolve(__dirname, '../'),
    })

    // Настройка алиасов
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@app': path.resolve(__dirname, '../src/app'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@shared': path.resolve(__dirname, '../src/shared'),
      },
    }

    // Настройка плагинов
    config.plugins = [
      ...(config.plugins || []),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    ]

    return config
  },
}

export default config
