import { ReactElement } from 'react'
import { getFormatDate } from '@shared/utils'
import { useTranslation } from 'react-i18next'

import styles from './dateUpdateShow.module.scss'

interface IDateUpdateShow {
  date: Date | null
  formatPattern: string
}

/**
 * Фича, отображающая дату обновления данных расписания
 * @param {IDateUpdateShow}
 * @returns {ReactElement | null}
 */
export const DateUpdateShow = ({
  date,
  formatPattern,
}: IDateUpdateShow): ReactElement | null => {
  const { t } = useTranslation()

  if (!date) {
    return null
  }

  return (
    <div
      className={styles.dateUpdateShow}
    >{`${t('Дата обновления')}: ${getFormatDate(date, formatPattern)}`}</div>
  )
}
