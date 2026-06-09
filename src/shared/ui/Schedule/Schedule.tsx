import { IBaseApiResult } from '@shared/api'
import { ReactElement, useMemo } from 'react'
import { getFormatDate, getRelativeDateText } from '@shared/utils'

import { LESSONS } from './lib/Constants'
import styles from './schedule.module.scss'
import { ScheduleItem } from './ScheduleItem'
import { getGroupByDateSchedule, getScheduleTemplate } from './lib/Helpers'

interface ISchedule extends IScheduleTable {
  currentWeekDay?: LESSONS
  /**
   * Признак, что отображаем единственную таблицу с текущим днем
   */
  isSingle?: boolean
}

/**
 * Компонент отображения расписания в виде набора таблиц
 * @param {IScheduleTable} [props]
 * @returns {ReactElement | null}
 * @remark возможно отображение расписания только для текущего дня
 */
export function Schedule({
  scheduleData: scheduleDataUnserialized = [],
  currentWeekDay,
  isSingle = false,
}: ISchedule): ReactElement | null {
  const groupedSchedule = useMemo(() => {
    if (!scheduleDataUnserialized.length) {
      return []
    }

    // получаем сгруппированные по дням недели предметы
    return getGroupByDateSchedule(scheduleDataUnserialized)
  }, [scheduleDataUnserialized])

  /**
   * Данные по текущему дню недели
   */
  const dayScheduleData = useMemo(() => {
    if (!(isSingle && currentWeekDay)) {
      return []
    }

    return groupedSchedule[currentWeekDay]
  }, [isSingle, currentWeekDay, groupedSchedule])

  if (!scheduleDataUnserialized.length) {
    return null
  }

  if (isSingle) {
    // если необходимо отобразить расписание только по текущему дню
    return <ScheduleTable scheduleData={dayScheduleData} />
  }

  return (
    <>
      {Object.entries(groupedSchedule).map(([lessonId, scheduleData]) => (
        <ScheduleTable key={lessonId} scheduleData={scheduleData} />
      ))}
    </>
  )
}

interface IScheduleTable {
  scheduleData: IBaseApiResult[]
}

/**
 * Компонент таблицы с расписанием
 * @param {ISchedule} [props]
 * @returns {ReactElement}
 */
function ScheduleTable({ scheduleData = [] }: IScheduleTable): ReactElement {
  const scheduleTemplate = useMemo(() => getScheduleTemplate(), [])
  const scheduleDate = scheduleData.at(0)?.date

  /**
   * Текущая дата расписания в формате D MMMM
   */
  const currentScheduleDate = useMemo(() => {
    if (scheduleDate) {
      return getFormatDate(scheduleDate, 'D MMMM')
    }

    return ''
  }, [scheduleDate])

  /**
   * Возвращает надпись "вчера", "сегодня", "завтра"
   */
  const relativeDateCaption = useMemo(() => {
    return getRelativeDateText(scheduleDate)
  }, [scheduleDate])

  /**
   * Отформатированная надпись дата
   */
  const dateCaption = useMemo(() => {
    if (relativeDateCaption) {
      return [relativeDateCaption, currentScheduleDate].join(' | ')
    }

    return currentScheduleDate
  }, [relativeDateCaption, currentScheduleDate])

  return (
    <div className={styles.schedule}>
      <div className={styles.header}>
        <div className={styles.caption}>{dateCaption}</div>
      </div>
      <div className={styles.content}>
        {scheduleTemplate.map((lessonData) => {
          const lessonDataStartTime = lessonData.startTime
          const currentLessonData: IBaseApiResult[] = []

          scheduleData.forEach((item) => {
            if (item.startTime === lessonDataStartTime) {
              currentLessonData.push(item)
            }
          })

          return (
            <ScheduleItem key={lessonData.id} lessonData={currentLessonData} />
          )
        })}
      </div>
    </div>
  )
}
