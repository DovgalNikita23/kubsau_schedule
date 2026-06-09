import { Navigate } from 'react-router-dom'
import { ROUTE_PATHS } from '@shared/constants'

/**
 * Хелпер, навигирующий на рутовую страницу
 */
export function getToInitialPage(): void {
  Navigate({ to: ROUTE_PATHS.index })
}
