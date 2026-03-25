import { ReactElement } from 'react'
import { ScheduleTable } from '@shared/ui'
import { DateUpdateShow } from '@features/DateUpdateShow'
import { TitleAndWeekShow } from '@features/TitleAndWeekShow'

import styles from './shedulePage.module.scss'
import { ShedulePageMain } from './ShedulePageMain'
import { ShedulePageHeader } from './ShedulePageHeader'

/**
 * Страница с полным расписанием (лист)
 * @returns {ReactElement}
 */
export const FullScheduleTablePage = (): ReactElement => {
  return (
    <div className={styles.shedulePage}>
      <ShedulePageHeader />
      <ShedulePageMain>
        <div className={styles.titleAndWeekShow}>
          <TitleAndWeekShow groupName="ПИ2441" weekNumber={0} />
        </div>
        <div className={styles.updateDateBlock}>
          <DateUpdateShow
            date="2025-09-29T09:00:16.498Z"
            formatPattern="YYYY-MM-DD"
          />
        </div>
        <ScheduleTable />
        <ScheduleTable />
      </ShedulePageMain>
    </div>
  )
}
