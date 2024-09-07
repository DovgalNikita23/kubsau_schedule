import { FC } from 'react'
import { Pagination } from '@shared/ui'
import styles from '../shedulePage.module.scss'
import UStudentLogo from '@app/assets/svg/UStudentLogo.svg'

interface IShedulePageHeader {
  children?: React.ReactNode
}

export const ShedulePageHeader: FC<IShedulePageHeader> = ({ children }) => {
  return (
    <header className={styles.shedulePageHeader}>
      <div className={styles.headerBlock}>
        <div className={styles.logoBlock}>
          <div className={styles.logo}>
            <UStudentLogo width="100%" height="100%" />
          </div>
        </div>
        <div className={styles.title}>Расписание</div>
        <div className={styles.datePicker}></div>
      </div>
      <div className={styles.carousel}>
        <Pagination total={60} />
      </div>
      {children}
    </header>
  )
}
