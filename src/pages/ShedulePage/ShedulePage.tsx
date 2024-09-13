import {
  $failConnect,
  $failConnectInfo,
  $isLoading,
  $successConnectInfo,
  ShedulePageGate,
} from './config'
import { IconButton, Input, Loader, useSnackBar } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import { Box } from '@mui/material'
import { DateUpdateShow } from '@features/DateUpdateShow'
import SearchIcon from '@mui/icons-material/Search'
import { ShedulePageHeader } from './ShedulePageHeader'
import { ShedulePageMain } from './ShedulePageMain'
import styles from './shedulePage.module.scss'
import { TitleAndWeekShow } from '@features/TitleAndWeekShow'
import colors from '@app/assets/variables/_colors.module.scss'
// import { ShedulePageFooter } from './ShedulePageFooter'

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
      <ShedulePageMain>
        <div className={styles.titleAndWeekShow}>
          <TitleAndWeekShow groupName="ПИ2002" weekNumber={0} />
        </div>
        <div className={styles.updateDateBlock}>
          <DateUpdateShow
            date="2024-09-08T09:00:16.498Z"
            formatPattern="YYYY-MM-DD"
          />
        </div>
        <div className={styles.inputBlock}>
          <Input placeholder="Группа, преподаватель, аудитория" error />
          <IconButton size="large">
            <SearchIcon sx={{ color: colors.OnPrimary }} />
          </IconButton>
        </div>
      </ShedulePageMain>
      {/* <ShedulePageFooter /> - TODO: на будущее*/}
      {successConnectInfo && SnackBar}
    </div>
  )
}
