import dayjs from 'dayjs'
import isoWeekPlugin from 'dayjs/plugin/isoWeek'

/**
 * Функция, возвращающая номер дня недели
 * @returns {number}
 */
export function getCurrentWeekDay(): number {
  dayjs.extend(isoWeekPlugin)

  return dayjs().isoWeekday()
}
