import { FC } from 'react'
import styles from '../shedulePage.module.scss'
import { Pagination } from '@mui/material'

interface IShedulePageHeader {
  children?: React.ReactNode
}

export const ShedulePageHeader: FC<IShedulePageHeader> = ({ children }) => {
  return (
    <header className={styles.shedulePageHeader}>
      <div className={styles.headerBlock}>
        <div className={styles.title}>Расписание</div>
      </div>
      <div className={styles.carousel}>
        <Pagination count={6} />
      </div>
      {children}
    </header>
  )
}
