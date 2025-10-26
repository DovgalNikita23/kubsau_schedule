import { lessonsData } from './config'
import { ScheduleItem } from './ScheduleItem'
import styles from './schedule.module.scss'

export const Schedule = () => {
  return (
    <div className={styles.Schedule}>
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
