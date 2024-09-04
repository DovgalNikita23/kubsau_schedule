import {
  $failConnect,
  $failConnectInfo,
  $isLoading,
  $successConnectInfo,
  ShedulePageGate,
} from './config'
import { Loader, useSnackBar } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import styles from './shedulePage.module.scss'

export const ShedulePage = () => {
  useGate(ShedulePageGate)

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
