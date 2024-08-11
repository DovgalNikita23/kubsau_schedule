import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@pages/MainPage'
import { ROUTE_PATHS } from '@shared/constants'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.index,
    element: <MainPage />,
  },
])
