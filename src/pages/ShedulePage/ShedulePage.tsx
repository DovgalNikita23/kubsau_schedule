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
import { Box } from '@mui/material'
import { ShedulePageHeader } from './ShedulePageHeader'
import { ShedulePageMain } from './ShedulePageMain'
import { ShedulePageFooter } from './ShedulePageFooter'

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
        <ShedulePageHeader />
        <ShedulePageMain>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Loader size="50px" />
          </Box>
        </ShedulePageMain>
        <ShedulePageFooter />
        {failConnect && SnackBar}
      </div>
    )
  }

  return (
    <div className={styles.shedulePage}>
      <ShedulePageHeader />
      <ShedulePageMain></ShedulePageMain>
      <ShedulePageFooter />
      {successConnectInfo && SnackBar}
    </div>
  )
}
