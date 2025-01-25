declare module '*.module.scss'
declare module 'eslint-plugin-react'
declare module '*.svg' {
  import * as React from 'react'
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
