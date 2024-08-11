import {
  BuildMode,
  BuildPaths,
  BuildPlatfrom,
} from './config/build/types/types'
import { buildWebpack } from './config/build/buildWebpack'
import path from 'path'
import webpack from 'webpack'
interface EnvVariables {
  mode?: BuildMode
  port?: number
  platform?: BuildPlatfrom
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  }

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? 'development',
    paths,
    platfrom: env.platform ?? 'desktop',
  })

  return config
}
