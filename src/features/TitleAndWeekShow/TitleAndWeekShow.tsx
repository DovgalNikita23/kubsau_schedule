import { ReactElement, useMemo } from 'react'
import styles from './titleAndWeekShow.module.scss'

interface ITitleAndWeekShow {
  groupName: string
  weekNumber: number
}

export const TitleAndWeekShow = ({
  groupName,
  weekNumber,
}: ITitleAndWeekShow): ReactElement | null => {
  const weekName = useMemo(
    () => (weekNumber === 0 ? 'Первая неделя' : 'Вторая неделя'),
    [weekNumber]
  )

  if (!(weekName && groupName)) {
    // если нет данных о номере недели и о группе
    return null
  }

  return (
    <div className={styles.TitleAndWeekShow}>
      {groupName && (
        <>
          <div className={styles.groupName}>{groupName}</div>
          <div className={styles.devider}></div>
        </>
      )}
      <div className={styles.weekNumber}>{weekName}</div>
    </div>
  )
}
