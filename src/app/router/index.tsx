import { FullScheduleTablePage, ShedulePage } from '@pages/index'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTE_PATHS } from '@shared/constants'

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
