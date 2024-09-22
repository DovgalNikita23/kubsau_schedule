import Calendar from '@app/assets/svg/Calendar.svg'
import { FC } from 'react'
import { getCurrentWeekEvent } from '../config'
import { Pagination } from '@shared/ui'
import styles from '../shedulePage.module.scss'
import { useUnit } from 'effector-react'
import UStudentLogo from '@app/assets/svg/UStudentLogo.svg'

interface IShedulePageHeader {
  children?: React.ReactNode
}

export const ShedulePageHeader: FC<IShedulePageHeader> = ({ children }) => {
  const [getCurrentWeek] = useUnit([getCurrentWeekEvent])

  const handleChangeDay = (weekNumber: number) => {
    getCurrentWeek(weekNumber)
  }

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
            <Calendar width="100%" height="100%" />
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
