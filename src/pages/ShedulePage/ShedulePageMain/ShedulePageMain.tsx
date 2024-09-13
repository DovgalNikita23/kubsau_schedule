import { FC } from 'react'
import styles from '../shedulePage.module.scss'

interface ShedulePageMain {
  children?: React.ReactNode
}

export const ShedulePageMain: FC<ShedulePageMain> = ({ children }) => {
  return <main className={styles.shedulePageMain}>{children}</main>
}
