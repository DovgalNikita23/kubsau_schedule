import classNames from 'classnames'
import { ReactElement } from 'react'
import { IBaseApiResult } from '@shared/api'

import styles from '../schedule.module.scss'

export interface IScheduleItem {
  lessonData: Partial<IBaseApiResult>[]
}

/**
 * Элемент списка таблицы расписания
 * @param {IScheduleItem} [data]
 * @returns {ReactElement}
 */
export const ScheduleItem = ({
  lessonData = [],
}: IScheduleItem): ReactElement => {
  const isSplittedLesson = lessonData.length > 1
  const groupLength = lessonData?.at(0)?.group?.split('/')?.length
  const isHalfGroup = groupLength && groupLength > 1
  const commonLessonData = lessonData.at(0)

  return (
    <div className={styles.scheduleItem}>
      <div className={styles.timeRangeBlock}>
        <div className={styles.wrapper}>
          <div className={styles.startTime}>{commonLessonData?.startTime}</div>
          <div className={styles.endTime}>{commonLessonData?.endTime}</div>
        </div>
      </div>
      <div
        className={classNames(styles.lessonType, {
          [styles.isLecture]: commonLessonData?.isLecture,
        })}
      ></div>
      <div className={styles.lessonInfo}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.lesson}>{commonLessonData?.lesson}</div>
            {lessonData.map((lessonItem) => {
              return (
                <div key={lessonItem.id} className={styles.teacher}>
                  <a href={lessonItem.teacherCardLink} target="_blank">
                    {lessonItem?.teacher}
                  </a>
                </div>
              )
            })}
          </div>
          <div className={styles.additionalInfo}>
            <div
              className={classNames(styles.audience, {
                [styles.invisible]: isHalfGroup,
              })}
            >
              {commonLessonData?.audience}
            </div>
            {isHalfGroup &&
              lessonData.map((lessonItem) => {
                return (
                  <div key={lessonItem.id} className={styles.manyTeachersBlock}>
                    <span className={styles.audience}>
                      {lessonItem?.audience}
                    </span>
                    |
                    <span className={styles.groupName}>
                      {lessonItem?.group}
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
