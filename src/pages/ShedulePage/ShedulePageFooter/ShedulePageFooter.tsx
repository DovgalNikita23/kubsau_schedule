import { FC } from 'react'
import styles from '../shedulePage.module.scss'

interface IShedulePageFooter {
  children?: React.ReactNode
}

export const ShedulePageFooter: FC<IShedulePageFooter> = ({ children }) => {
  return <footer className={styles.shedulePageFooter}>{children}</footer>
}
