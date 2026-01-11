import { DateUpdateShow } from '@features/DateUpdateShow'
import { ReactElement } from 'react'
import { ScheduleTable } from '@shared/ui'
import { ShedulePageHeader } from './ShedulePageHeader'
import { ShedulePageMain } from './ShedulePageMain'
import styles from './shedulePage.module.scss'
import { TitleAndWeekShow } from '@features/TitleAndWeekShow'

/**
 * Страница с полным расписанием
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
