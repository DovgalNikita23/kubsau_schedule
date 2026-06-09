import dayjs from 'dayjs'

/**
 * Возвращает текущий день недели
 * @returns {Date}
 */
export function getCurrentDay(): Date {
  return dayjs().toDate()
}
