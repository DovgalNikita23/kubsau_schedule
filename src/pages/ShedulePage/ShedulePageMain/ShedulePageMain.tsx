import { FC, ReactElement } from 'react'

import styles from '../shedulePage.module.scss'

interface IShedulePageMain {
  children?: React.ReactNode
}

/**
 * Фича, отображающая информацию о группе и номере недели
 * @param {IShedulePageHeader} [props]
 * @returns {ReactElement}
 */
export const ShedulePageMain: FC<IShedulePageMain> = ({
  children,
}): ReactElement => {
  return <main className={styles.shedulePageMain}>{children}</main>
}
