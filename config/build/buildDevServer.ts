import { BuildOptions } from './types/types'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port ?? 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://51.250.105.105',
        changeOrigin: true,
        secure: false, // Установите в true, если ваш API поддерживает HTTPS
        pathRewrite: { '^/api': '/api/v1' }, // Опционально: переписывает путь
      },
    ],
  }
}
