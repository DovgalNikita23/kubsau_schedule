import { ReactElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './titleAndWeekShow.module.scss'

interface ITitleAndWeekShow {
  groupName: string
  weekNumber: number
}

/**
 * Фича, отображающая информацию о группе и номере недели
 * @param {ITitleAndWeekShow} [props]
 * @returns {ReactElement | null}
 */
export const TitleAndWeekShow = ({
  groupName,
  weekNumber,
}: ITitleAndWeekShow): ReactElement | null => {
  const { t } = useTranslation()

  const weekName = useMemo(
    () => (weekNumber === 0 ? t('Первая неделя') : t('Вторая неделя')),
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
