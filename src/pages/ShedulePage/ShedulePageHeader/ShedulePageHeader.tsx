import { FC, useCallback, useMemo } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { getCurrentWeekEvent } from '../config'
import { IconButton } from '@mui/material'
import { Pagination } from '@shared/ui'
import { Popover } from 'antd'
import styles from '../shedulePage.module.scss'
import { useUnit } from 'effector-react'
import UStudentLogo from '@app/assets/svg/UStudentLogo.svg'

interface IShedulePageHeader {
  children?: React.ReactNode
}

export const ShedulePageHeader: FC<IShedulePageHeader> = ({ children }) => {
  const [getCurrentWeek] = useUnit([getCurrentWeekEvent])

  const handleChangeDay = useCallback(
    (weekNumber: number) => {
      getCurrentWeek(weekNumber)
    },
    [getCurrentWeek]
  )

  const popoverTitle = useMemo(() => {
    return 'Выбор в календаре'
  }, [])

  const popoverContent = useMemo(() => {
    return 'Данная функция находится в стадии разработки'
  }, [])

  return (
    <header className={styles.shedulePageHeader}>
      <div className={styles.headerBlock}>
        <div className={styles.logoBlock}>
          <div className={styles.logo}>
            <UStudentLogo width="100%" height="100%" />
          </div>
        </div>
        <div className={styles.title}>Расписание</div>
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
