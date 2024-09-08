import { FC } from 'react'
import { getFormatDate } from '@shared/utils'
import styles from './dateUpdateShow.module.scss'

interface IDateUpdateShow {
  date: string
  formatPattern: string
}

export const DateUpdateShow: FC<IDateUpdateShow> = ({
  date,
  formatPattern,
}) => {
  return (
    <div
      className={styles.dateUpdateShow}
    >{`Дата обновления: ${getFormatDate(date, formatPattern)}`}</div>
  )
}
