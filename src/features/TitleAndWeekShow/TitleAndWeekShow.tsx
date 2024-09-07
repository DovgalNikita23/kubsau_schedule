import { FC, useMemo } from 'react'
import styles from './titleAndWeekShow.module.scss'

type IWeekNumber = 0 | 1

interface ITitleAndWeekShow {
  groupName: string
  weekNumber: IWeekNumber
}

export const TitleAndWeekShow: FC<ITitleAndWeekShow> = ({
  groupName,
  weekNumber,
}) => {
  const weekName = useMemo(
    () => (weekNumber === 0 ? 'Первая неделя' : 'Вторая неделя'),
    [weekNumber]
  )

  return (
    <div className={styles.TitleAndWeekShow}>
      <div className={styles.groupName}>{groupName}</div>
      <div className={styles.devider}></div>
      <div className={styles.weekNumber}>{weekName}</div>
    </div>
  )
}
