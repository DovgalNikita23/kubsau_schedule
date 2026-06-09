import { Popover } from 'antd'
import { Pagination } from '@shared/ui'
import { useUnit } from 'effector-react'
import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React, { ReactElement, useCallback, useMemo } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import Logo from './Logo'
import styles from '../shedulePage.module.scss'
import {
  $currentWeek,
  currentWeekEventChanged,
  getCurrentWeekDayEvent,
  getCurrentWeekEvent,
} from '../config'

interface IShedulePageHeader {
  children?: React.ReactNode
  needShowWeekDayCarousel?: boolean
}

/**
 * Шапка страницы с расписанием
 * @param {IShedulePageHeader} [props]
 * @returns {ReactElement}
 */
export const ShedulePageHeader = ({
  children,
  needShowWeekDayCarousel = false,
}: IShedulePageHeader): ReactElement => {
  const { t } = useTranslation()

  const [currentWeek, getCurrentWeek, getCurrentWeekDay, currentWeekChanged] =
    useUnit([
      $currentWeek,
      getCurrentWeekEvent,
      getCurrentWeekDayEvent,
      currentWeekEventChanged,
    ])

  /**
   * Обработчик клика по "календарю"
   */
  const handleChangeDay = useCallback(
    (weekNumber: number, weekDayNumber: number) => {
      getCurrentWeek(weekNumber)
      getCurrentWeekDay(weekDayNumber)
      currentWeekChanged(weekNumber !== currentWeek)
    },
    [currentWeek, getCurrentWeek, getCurrentWeekDay, currentWeekChanged]
  )

  /**
   * Всплывающая подсказка
   */
  const popoverTitle = useMemo(() => {
    return 'Выбор в календаре'
  }, [])

  /**
   * Контент всплывающей подсказки
   */
  const popoverContent = useMemo(() => {
    return 'Данная функция находится в стадии разработки'
  }, [])

  return (
    <header className={styles.shedulePageHeader}>
      <div className={styles.headerBlock}>
        <Logo />
        <div className={styles.title}>{t('Расписание')}</div>
        <div className={styles.datePickerBlock}>
          <div className={styles.datePicker}>
            <IconButton>
              <Popover
                placement="leftTop"
                title={popoverTitle}
                content={popoverContent}
                arrow={true}
                trigger="click"
              >
                <CalendarMonthIcon
                  className={styles.datePickerIcon}
                  sx={{ color: 'black' }}
                />
              </Popover>
            </IconButton>
          </div>
        </div>
      </div>
      {needShowWeekDayCarousel && (
        <div className={styles.carousel}>
          <Pagination total={60} onDayChange={handleChangeDay} />
        </div>
      )}
      {children}
    </header>
  )
}
