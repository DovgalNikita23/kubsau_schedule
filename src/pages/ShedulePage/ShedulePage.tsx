import {
  $currentWeek,
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
import { ChangeEvent, useCallback, useEffect } from 'react'
import { IconButton, Input, ScheduleTable, useSnackBar } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import colors from '@app/assets/variables/_colors.module.scss'
import { DateUpdateShow } from '@features/DateUpdateShow'
import { FullScheduleButton } from '@shared/ui'
import { FullScreenLoader } from '@features/FullScreenLoader'
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
    currentWeek,
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
    $currentWeek,
    $scheduleData,
  ])

  const { SnackBar, handleShowSnackBar } = useSnackBar({
    message: failConnectInfo || successConnectInfo,
  })

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSearch = useCallback(() => {
    if (isInputValueEmpty) {
      handleShowSnackBar('Введите группу, преподавателя или аудиторию')
    } else {
      searchInputHandler()
    }
  }, [handleShowSnackBar])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (isLoading) {
    return (
      <div className={styles.shedulePage}>
        <ShedulePageHeader />
        <ShedulePageMain>
          <FullScreenLoader />
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
          <TitleAndWeekShow groupName="ПИ2441" weekNumber={currentWeek} />
        </div>
        <div className={styles.updateDateBlock}>
          <DateUpdateShow
            date="2025-09-29T09:00:16.498Z"
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
          {isScheduleDataLoading ? <FullScreenLoader /> : <ScheduleTable />}
        </div>
        <div className={styles.fullScheduleButton}>
          <FullScheduleButton />
        </div>
      </ShedulePageMain>
      {successConnectInfo && SnackBar}
    </div>
  )
}
