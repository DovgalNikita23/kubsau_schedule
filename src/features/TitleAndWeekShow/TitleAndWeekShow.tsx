import { FC, useMemo } from 'react'
import styles from './titleAndWeekShow.module.scss'

interface ITitleAndWeekShow {
  groupName: string
  weekNumber: number
}

export const TitleAndWeekShow: FC<ITitleAndWeekShow> = ({
  groupName,
  weekNumber,
}) => {
  const weekName =
    useMemo(
      () => (weekNumber === 0 ? 'Первая неделя' : 'Вторая неделя'),
      [weekNumber]
    ) || ''

  return (
    <div className={styles.TitleAndWeekShow}>
      <div className={styles.groupName}>{groupName}</div>
      <div className={styles.devider}></div>
      <div className={styles.weekNumber}>{weekName}</div>
    </div>
  )
}
