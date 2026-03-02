import { ROUTE_PATHS } from '@shared/constants'
import { createBrowserRouter } from 'react-router-dom'
import { FullScheduleTablePage, ShedulePage } from '@pages/index'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.index,
    element: <ShedulePage />,
  },
  {
    path: ROUTE_PATHS.fullSchedule,
    element: <FullScheduleTablePage />,
  },
])
