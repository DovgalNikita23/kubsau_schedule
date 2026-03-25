import dayjs from 'dayjs'

/**
 * @funcion Функция форматирования даты
 * @param {string} date
 * @param {string} pattern
 * @returns {string}
 */
export const getFormatDate = (date: string, pattern: string): string => {
  return dayjs(date).format(pattern)
}
