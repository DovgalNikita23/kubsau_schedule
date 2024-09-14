import {
  $failConnect,
  $failConnectInfo,
  $inputValue,
  $isInputValueEmpty,
  $isLoading,
  $isScheduleDataLoading,
  $scheduleData,
  $successConnectInfo,
  searchInputHandlerEvent,
  setInputValueHandler,
  ShedulePageGate,
} from './config'
import { IconButton, Input, Loader, useSnackBar } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import { Box } from '@mui/material'
import { ChangeEvent } from 'react'
import colors from '@app/assets/variables/_colors.module.scss'
import { DateUpdateShow } from '@features/DateUpdateShow'
import SearchIcon from '@mui/icons-material/Search'
import { ShedulePageHeader } from './ShedulePageHeader'
import { ShedulePageMain } from './ShedulePageMain'
import styles from './shedulePage.module.scss'
import { TitleAndWeekShow } from '@features/TitleAndWeekShow'

export const ShedulePage = () => {
  useGate(ShedulePageGate)

  const [
    isLoading,
    failConnect,
    failConnectInfo,
    successConnectInfo,
    inputValue,
    setInputValue,
    isInputValueEmpty,
    searchInputHandler,
    isScheduleDataLoading,
    // scheduleData,
  ] = useUnit([
    $isLoading,
    $failConnect,
    $failConnectInfo,
    $successConnectInfo,
    $inputValue,
    setInputValueHandler,
    $isInputValueEmpty,
    searchInputHandlerEvent,
    $isScheduleDataLoading,
    $scheduleData,
  ])
  const { SnackBar, handleShowSnackBar } = useSnackBar({
    message: failConnectInfo || successConnectInfo,
  })

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSearch = () => {
    searchInputHandler()
    if (isInputValueEmpty) {
      handleShowSnackBar('Введите группу, преподавателя или аудиторию')
    }
  }

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
          <Input
            placeholder="Группа, преподаватель, аудитория"
            value={inputValue}
            onChange={handleInputValue}
            error={isInputValueEmpty}
          />
          <IconButton size="large" onClick={handleSearch}>
            <SearchIcon sx={{ color: colors.OnPrimary }} />
          </IconButton>
        </div>
        <div className={styles.scheduleBlock}>
          {isScheduleDataLoading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Loader size="50px" />
            </Box>
          )}
        </div>
      </ShedulePageMain>
      {successConnectInfo && SnackBar}
    </div>
  )
}
