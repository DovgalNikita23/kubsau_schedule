import dayjs from 'dayjs'
import i18n from 'i18next'

/**
 * Возвращает текстовое представление даты относительно текущего дня
 * @param {string | Date | dayjs.Dayjs | number} date - дата для проверки
 * @returns {string} 'вчера', 'сегодня', 'завтра'
 */
export const getRelativeDateText = (
  date: string | Date | dayjs.Dayjs | number | undefined
): string => {
  if (!date) {
    return ''
  }

  const targetDate = dayjs(date).startOf('day')
  const today = dayjs().startOf('day')

  const diffInDays = targetDate.diff(today, 'day')

  switch (diffInDays) {
    case -1:
      return i18n.t('Вчера')
    case 0:
      return i18n.t('Сегодня')
    case 1:
      return i18n.t('Завтра')
    default:
      return ''
  }
}
