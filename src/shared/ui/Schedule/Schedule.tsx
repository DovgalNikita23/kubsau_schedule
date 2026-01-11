import { ILessonsData, lessonsData as MLD } from './config'
import { ReactElement } from 'react'
import { ScheduleItem } from './ScheduleItem'
import styles from './schedule.module.scss'

interface IScheduleTable {
  /**
   * Данные по текущему дню
   */
  scheduleData?: ILessonsData[]
  /**
   * Признак, что отображаем единственную таблицу с текущим днем
   */
  isSingle?: boolean
}

/**
 * Компонент отображения расписания в виде набора таблиц
 * @param {IScheduleTable} [props]
 * @returns {ReactElement}
 * @remark возможно отображение расписания только для текущего дня
 */
export function ScheduleTable({
  scheduleData,
  isSingle = false,
}: IScheduleTable): ReactElement {
  if (isSingle) {
    // если необходимо отобразить расписание только по текущему дню
    return <Schedule lessonsData={scheduleData} />
  }

  return <Schedule lessonsData={scheduleData} />
}

interface ISchedule {
  lessonsData: ILessonsData[]
}

/**
 * Компонент таблицы с расписанием
 * @param {ISchedule} [props]
 * @returns {ReactElement}
 */
function Schedule({ lessonsData = MLD }: ISchedule): ReactElement {
  return (
    <div className={styles.schedule}>
      <div className={styles.header}>
        <div className={styles.caption}>Сегодня | 29 сентября</div>
      </div>
      <div className={styles.content}>
        {lessonsData.map((data, index) => (
          <ScheduleItem key={index} lessonsData={data} />
        ))}
      </div>
    </div>
  )
}
