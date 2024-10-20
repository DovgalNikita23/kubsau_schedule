import { lessonsTime } from './config'
import { ScheduleItem } from './ScheduleItem'
import styles from './schedule.module.scss'

export const Schedule = () => {
  return (
    <div className={styles.Schedule}>
      <div className={styles.header}>
        <div className={styles.caption}>Сегодня | 5 апреля</div>
      </div>
      <div className={styles.content}>
        {lessonsTime.map((data) => (
          <ScheduleItem lessonsTimeData={data} />
        ))}
      </div>
    </div>
  )
}
