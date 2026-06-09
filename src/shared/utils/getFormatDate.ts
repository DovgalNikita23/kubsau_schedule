import dayjs from 'dayjs'

/**
 * @funcion Функция форматирования даты
 * @param {string | Date | number} date
 * @param {string} pattern
 * @returns {string}
 */
export const getFormatDate = (
  date: string | Date | number,
  pattern: string
): string => {
  return dayjs(date).format(pattern)
}
