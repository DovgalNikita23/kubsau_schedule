import {
  $failConnect,
  $failConnectInfo,
  $isLoading,
  $successConnectInfo,
  ShedulePageGate,
} from './config'
import { Loader, useSnackBar } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import { Box } from '@mui/material'
// import { ShedulePageFooter } from './ShedulePageFooter'
import { ShedulePageHeader } from './ShedulePageHeader'
import { ShedulePageMain } from './ShedulePageMain'
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
        {/* <ShedulePageFooter /> - TODO: на будущее*/}
        {failConnect && SnackBar}
      </div>
    )
  }

  return (
    <div className={styles.shedulePage}>
      <ShedulePageHeader />
      <ShedulePageMain></ShedulePageMain>
      {/* <ShedulePageFooter /> - TODO: на будущее*/}
      {successConnectInfo && SnackBar}
    </div>
  )
}
