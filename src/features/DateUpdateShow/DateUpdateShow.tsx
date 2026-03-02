import { ReactElement } from 'react'
import { getFormatDate } from '@shared/utils'
import { useTranslation } from 'react-i18next'

import styles from './dateUpdateShow.module.scss'

interface IDateUpdateShow {
  date: string
  formatPattern: string
}

/**
 * Фича, отображающая дату обновления данных расписания
 * @param {IDateUpdateShow}
 * @returns {ReactElement}
 */
export const DateUpdateShow = ({
  date,
  formatPattern,
}: IDateUpdateShow): ReactElement => {
  const { t } = useTranslation()

  return (
    <div
      className={styles.dateUpdateShow}
    >{`${t('Дата обновления')}: ${getFormatDate(date, formatPattern)}`}</div>
  )
}
