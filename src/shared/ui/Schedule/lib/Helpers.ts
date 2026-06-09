import dayjs from 'dayjs'
import { IBaseApiResult } from '@shared/api'
import dayjsWeekday from 'dayjs/plugin/weekday'

import { DAY_LESSONS, LESSONS } from './Constants'

dayjs.extend(dayjsWeekday)

/**
 * Функция, возвращающая день недели по timestamp
 * @param {number} timestamp
 * @returns {number} 1 - понедельник, 6 - суббота
 */
export function getWeekDayNumber(timestamp: number): number {
  const dayjsObject = dayjs(timestamp)
  const currentWeekDay = dayjsObject.day() // 1 - понедельник, 7 - воскресенье
  return currentWeekDay >= 6 ? 6 : currentWeekDay
}

/**
 * Получает дату понедельника недели, к которой относится переданная дата
 * @param {number} timestamp - timestamp любой даты из недели
 * @returns {dayjs.Dayjs} объект dayjs с датой понедельника
 */
export const getWeekMonday = (timestamp: number): dayjs.Dayjs => {
  const date = dayjs(timestamp)
  const currentDay = date.day() // 1 - понедельник, 7 - воскресенье
  return date.subtract(currentDay - 1, 'day')
}

/**
 * Получает timestamp для конкретного дня недели
 * @param {dayjs.Dayjs} monday - дата понедельника
 * @param {number} dayNumber - номер дня недели (1-6, где 1 - понедельник)
 * @returns {number} timestamp для указанного дня
 */
export const getDayTimestamp = (
  monday: dayjs.Dayjs,
  dayNumber: number
): number => {
  return monday.add(dayNumber - 1, 'day').valueOf()
}

/**
 * Создает фейковый объект урока для пустого дня
 * @param {number} dayNumber - номер дня недели
 * @param {number} timestamp - timestamp для этого дня
 * @returns {IBaseApiResult} фейковый объект
 */
export const createEmptyLesson = (
  dayNumber: number,
  timestamp: number
): IBaseApiResult => {
  return {
    id: -dayNumber,
    weekNumber: 0,
    date: timestamp,
    startTime: '',
    endTime: '',
    isLecture: false,
    teacher: '—',
    teacherCardLink: '',
    lesson: 'Нет пар',
    audience: '—',
    group: '',
  }
}

/**
 * Группирует данные по дням недели
 * @param {IBaseApiResult[]} data - массив данных
 * @returns {Record<number, IBaseApiResult[]>} сгруппированные данные
 */
export const groupDataByWeekDay = (
  data: IBaseApiResult[]
): Record<number, IBaseApiResult[]> => {
  return data.reduce(
    (acc, item) => {
      const dateKey = getWeekDayNumber(item.date)
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(item)
      return acc
    },
    {} as Record<number, IBaseApiResult[]>
  )
}

/**
 * Заполняет пропущенные дни фейковыми данными
 * @param {Record<number, IBaseApiResult[]>} groupedData - сгруппированные данные
 * @param {dayjs.Dayjs} monday - дата понедельника
 * @returns {Record<number, IBaseApiResult[]>} дополненные данные
 */
export const fillMissingDays = (
  groupedData: Record<number, IBaseApiResult[]>,
  monday: dayjs.Dayjs
): Record<number, IBaseApiResult[]> => {
  const result = { ...groupedData }
  const allDays = [1, 2, 3, 4, 5, 6]

  for (const day of allDays) {
    if (!result[day]) {
      const timestamp = getDayTimestamp(monday, day)
      result[day] = [createEmptyLesson(day, timestamp)]
    }
  }

  return result
}

/**
 * Сортирует объект с данными по дням недели (1-6)
 * @param {Record<number, IBaseApiResult[]>} data
 * @returns {Record<number, IBaseApiResult[]>}
 */
export const sortByWeekDay = (
  data: Record<number, IBaseApiResult[]>
): Record<number, IBaseApiResult[]> => {
  const sorted: Record<number, IBaseApiResult[]> = {}
  for (let i = 1; i <= 6; i++) {
    if (data[i]) {
      sorted[i] = data[i]
    }
  }
  return sorted
}

/**
 * Функция-адаптер, группирующая данные по дням недели с добавлением пустых дней
 * @param {IBaseApiResult[]} data
 * @returns {Record<number, IBaseApiResult[]>}
 */
export const getGroupByDateSchedule = (
  data: IBaseApiResult[]
): Record<number, IBaseApiResult[]> => {
  // Если данных нет, используем текущую дату
  const sampleTimestamp = data.length > 0 ? data[0].date : Date.now()

  // Получаем понедельник недели
  const monday = getWeekMonday(sampleTimestamp)

  // Группируем данные
  const groupedData = groupDataByWeekDay(data)

  // Заполняем пропущенные дни
  const filledData = fillMissingDays(groupedData, monday)

  // Сортируем для гарантии порядка
  return sortByWeekDay(filledData)
}
export function getScheduleTemplate(): Pick<
  IBaseApiResult,
  'id' | 'isLecture' | 'startTime' | 'endTime'
>[] {
  const lessons = Object.keys(DAY_LESSONS).map(Number) as LESSONS[]

  return lessons.map(
    (
      lesson: LESSONS
    ): Pick<IBaseApiResult, 'id' | 'isLecture' | 'startTime' | 'endTime'> => {
      return {
        id: lesson,
        isLecture: false,
        ...DAY_LESSONS[lesson],
      }
    }
  )
}
