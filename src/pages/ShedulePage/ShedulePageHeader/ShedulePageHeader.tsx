import { FC } from 'react'
import { Pagination } from '@mui/material'
import styles from '../shedulePage.module.scss'
import UStudentLogo from '@app/assets/svg/uStudentLogo.svg'

interface IShedulePageHeader {
  children?: React.ReactNode
}

export const ShedulePageHeader: FC<IShedulePageHeader> = ({ children }) => {
  return (
    <header className={styles.shedulePageHeader}>
      <div className={styles.headerBlock}>
        <div className={styles.logoBlock}>
          <div className={styles.logo}>
            <UStudentLogo width="10)%" height="100%" />
          </div>
        </div>
        <div className={styles.title}>Расписание</div>
        <div className={styles.datePicker}></div>
      </div>
      <div className={styles.carousel}>
        <Pagination count={6} />
      </div>
      {children}
    </header>
  )
}
