import { Popover } from 'antd'
import { Link } from 'react-router-dom'
import { Pagination } from '@shared/ui'
import { useUnit } from 'effector-react'
import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ROUTE_PATHS } from '@shared/constants'
import { ReactElement, useCallback, useMemo } from 'react'
import UStudentLogo from '@app/assets/svg/UStudentLogo.svg'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import styles from '../shedulePage.module.scss'
import { getCurrentWeekEvent } from '../config'

interface IShedulePageHeader {
  children?: React.ReactNode
}

/**
 * Шапка страницы с расписанием
 * @param {IShedulePageHeader} [props]
 * @returns {ReactElement}
 */
export const ShedulePageHeader = ({
  children,
}: IShedulePageHeader): ReactElement => {
  const { t } = useTranslation()

  const [getCurrentWeek] = useUnit([getCurrentWeekEvent])

  /**
   * Обработчик клика по "календарю"
   */
  const handleChangeDay = useCallback(
    (weekNumber: number) => {
      getCurrentWeek(weekNumber)
    },
    [getCurrentWeek]
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
        <div className={styles.logoBlock}>
          <div className={styles.logo}>
            <Link
              to={ROUTE_PATHS.index}
              children={<UStudentLogo width="100%" height="100%" />}
            />
          </div>
        </div>
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
      <div className={styles.carousel}>
        <Pagination total={60} onDayChange={handleChangeDay} />
      </div>
      {children}
    </header>
  )
}
