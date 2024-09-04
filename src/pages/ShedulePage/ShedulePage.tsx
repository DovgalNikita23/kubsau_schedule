import {
  $failConnect,
  $failConnectInfo,
  $isLoading,
  $successConnectInfo,
} from './config'
import { Loader, useSnackBar } from '@shared/ui'
import styles from './shedulePage.module.scss'
import { useUnit } from 'effector-react'

export const ShedulePage = () => {
  const [isLoading, failConnect, failConnectInfo, successConnectInfo] = useUnit(
    [$isLoading, $failConnect, $failConnectInfo, $successConnectInfo]
  )
  const { SnackBar } = useSnackBar({
    message: failConnectInfo || successConnectInfo,
  })

  if (isLoading) {
    return (
      <div className={styles.shedulePage}>
        <div data-testid="content">Content here</div>
        <Loader size="50px" />
        {failConnect && SnackBar}
      </div>
    )
  }

  return (
    <div className={styles.shedulePage}>
      <div data-testid="content">Content here</div>
      {successConnectInfo && SnackBar}
    </div>
  )
}
