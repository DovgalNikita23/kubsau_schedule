import { ROUTE_PATHS } from '@shared/constants'
import { createBrowserRouter } from 'react-router-dom'
import { FullSchedulePage, ShedulePage } from '@pages/index'

/**
 * Конфигурация роутера
 * @public
 */
export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.index,
    element: <ShedulePage />,
  },
  {
    path: ROUTE_PATHS.fullSchedule,
    element: <FullSchedulePage />,
  },
])
