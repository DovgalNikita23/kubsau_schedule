import { createBrowserRouter } from 'react-router-dom'
import { ROUTE_PATHS } from '@shared/constants'
import { ShedulePage } from '@pages/index'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.index,
    element: <ShedulePage />,
  },
])
