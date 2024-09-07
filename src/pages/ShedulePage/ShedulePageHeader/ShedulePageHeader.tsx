import { FC } from 'react'
import { Pagination } from '@shared/ui'
import styles from '../shedulePage.module.scss'

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
        <Pagination total={60} />
      </div>
      {children}
    </header>
  )
}
