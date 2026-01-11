import { getFormatDate } from '@shared/utils'
import { ReactElement } from 'react'
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
  return (
    <div
      className={styles.dateUpdateShow}
    >{`Дата обновления: ${getFormatDate(date, formatPattern)}`}</div>
  )
}
