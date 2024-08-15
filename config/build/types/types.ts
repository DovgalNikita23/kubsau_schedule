export interface BuildPaths {
  entry: string
  html: string
  output: string
  src: string
  public: string
  context: string
}

export type BuildMode = 'production' | 'development'
export type BuildPlatfrom = 'mobile' | 'desktop'

export interface BuildOptions {
  port: number
  paths: BuildPaths
  mode: BuildMode
  platfrom: BuildPlatfrom
}
