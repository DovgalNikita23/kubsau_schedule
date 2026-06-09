import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { DateUpdateShow } from '@features/DateUpdateShow'
import { IconButton, Input, useSnackBar } from '@shared/ui'
import { TitleAndWeekShow } from '@features/TitleAndWeekShow'
import { FullScreenLoader } from '@features/FullScreenLoader'
import colors from '@app/assets/variables/_colors.module.scss'
import React, { ChangeEvent, ReactElement, useCallback, useEffect } from 'react'

import styles from '../shedulePage.module.scss'
import {
  $currentStudyGroup,
  $currentWeek,
  $failConnectInfo,
  $inputValue,
  $isInputValueEmpty,
  $isLoading,
  $isScheduleDataLoading,
  $lastDataUpdateDate,
  $successConnectInfo,
  searchInputHandlerEvent,
  setInputValueHandler,
} from '../config'

interface IShedulePageMain {
  needShowInput?: boolean
  children?: React.ReactNode
}

/**
 * Шаблон отображения основного контента страницы
 * @param {IShedulePageMain} [props]
 * @returns {ReactElement}
 */
export const ShedulePageMain = ({
  children,
  needShowInput = false,
}: IShedulePageMain): ReactElement => {
  const { t: translate } = useTranslation()

  const [
    isLoading,
    failConnectInfo,
    successConnectInfo,
    inputValue,
    setInputValue,
    isInputValueEmpty,
    searchInputHandler,
    currentWeek,
    lastDataUpdateDate,
    isScheduleDataLoading,
    currentStudyGroup,
  ] = useUnit([
    $isLoading,
    $failConnectInfo,
    $successConnectInfo,
    $inputValue,
    setInputValueHandler,
    $isInputValueEmpty,
    searchInputHandlerEvent,
    $currentWeek,
    $lastDataUpdateDate,
    $isScheduleDataLoading,
    $currentStudyGroup,
  ])

  const isShowInput = needShowInput
  const isShowlastDataUpdateDate = !!lastDataUpdateDate
  const isShowTitleAndWeek = currentWeek !== undefined && currentStudyGroup

  const { handleShowSnackBar } = useSnackBar({
    message: failConnectInfo || successConnectInfo,
  })

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSearch = useCallback(() => {
    if (isInputValueEmpty) {
      handleShowSnackBar(
        translate('Введите группу, преподавателя или аудиторию')
      )
    } else {
      searchInputHandler()
    }
  }, [isInputValueEmpty, translate, searchInputHandler, handleShowSnackBar])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading || isScheduleDataLoading) {
    return (
      <main className={styles.shedulePageMain}>
        <FullScreenLoader />
      </main>
    )
  }

  return (
    <main className={styles.shedulePageMain}>
      <>
        {isShowTitleAndWeek && (
          <div className={styles.titleAndWeekShow}>
            <TitleAndWeekShow
              groupName={currentStudyGroup}
              weekNumber={currentWeek}
            />
          </div>
        )}

        {isShowlastDataUpdateDate && (
          <div className={styles.updateDateBlock}>
            <DateUpdateShow
              date={lastDataUpdateDate}
              formatPattern="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        )}
        {isShowInput && (
          <div className={styles.inputBlock}>
            <Input
              placeholder={translate('Группа, преподаватель, аудитория')}
              value={inputValue}
              onChange={handleInputValue}
              error={isInputValueEmpty}
            />
            <IconButton size="large" onClick={handleSearch}>
              <SearchIcon sx={{ color: colors.OnPrimary }} />
            </IconButton>
          </div>
        )}
        {children}
      </>
    </main>
  )
}
