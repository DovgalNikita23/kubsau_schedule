import { ReactElement } from 'react'
import { Schedule } from '@shared/ui'
import { useUnit } from 'effector-react'

import { $scheduleData } from './config'
import styles from './shedulePage.module.scss'
import { ShedulePageMain } from './ShedulePageMain'
import { ShedulePageHeader } from './ShedulePageHeader'

/**
 * Страница с полным расписанием (лист)
 * @returns {ReactElement}
 */
export const FullSchedulePage = (): ReactElement => {
  const [scheduleData] = useUnit([$scheduleData])

  return (
    <div className={styles.shedulePage}>
      <ShedulePageHeader />
      <ShedulePageMain>
        <div className={styles.scheduleBlock}>
          <Schedule scheduleData={scheduleData} />
        </div>
      </ShedulePageMain>
    </div>
  )
}
