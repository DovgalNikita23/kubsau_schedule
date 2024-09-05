import { FC } from 'react'
import styles from '../shedulePage.module.scss'

interface ShedulePageMain {
  children?: React.ReactNode
}

export const ShedulePageMain: FC<ShedulePageMain> = ({ children }) => {
  return <header className={styles.shedulePageMain}>{children}</header>
}
