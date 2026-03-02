import { FC } from 'react'
import classNames from 'classnames'

import { ILessonsData } from '../config'
import styles from '../schedule.module.scss'

interface IScheduleItem {
  lessonsData: ILessonsData
}

export const ScheduleItem: FC<IScheduleItem> = ({ lessonsData }) => {
  return (
    <div className={styles.scheduleItem}>
      <div className={styles.timeRangeBlock}>
        <div className={styles.wrapper}>
          <div className={styles.startTime}>{lessonsData.startTime}</div>
          <div className={styles.endTime}>{lessonsData.endTime}</div>
        </div>
      </div>
      <div
        className={classNames(styles.lessonType, {
          [styles.isLecture]: lessonsData.isLecture,
        })}
      ></div>
      <div className={styles.lessonInfo}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.lesson}>{lessonsData?.lesson}</div>
            <div className={styles.teacher}>{lessonsData?.teacher}</div>
          </div>
          <div className={styles.audience}>{lessonsData?.audience}</div>
        </div>
      </div>
    </div>
  )
}
