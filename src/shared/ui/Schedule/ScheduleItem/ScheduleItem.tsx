import { FC } from 'react'
import { ILessonsTime } from '../config'
import styles from '../schedule.module.scss'

interface IScheduleItem {
  lessonsTimeData: ILessonsTime
}

export const ScheduleItem: FC<IScheduleItem> = ({ lessonsTimeData }) => {
  return (
    <div className={styles.scheduleItem}>
      <div className={styles.timeRangeBlock}>
        <div className={styles.wrapper}>
          <div className={styles.startTime}>{lessonsTimeData.startTime}</div>
          <div className={styles.endTime}>{lessonsTimeData.endTime}</div>
        </div>
      </div>
      <div className={styles.lessonType}></div>
      <div className={styles.lessonInfo}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.lesson}>
              Методы хранения и анализа данных
            </div>
            <div className={styles.teacher}>Кумратова А.М.</div>
          </div>
          <div className={styles.audience}>418зоо</div>
        </div>
      </div>
    </div>
  )
}
