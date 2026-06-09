import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

/**
 * @funcion Функция получения номера текущей недели - 0/1
 * @param {number} currentWeek
 * @returns {number}
 */
export const getCurrentWeek = (currentWeek: number = 0): number => {
  const getStartOfYear = () => {
    const today = dayjs()
    const currentYear = today.year()
    const septemberFirst = dayjs(`01-09-${currentYear}`, 'DD-MM-YYYY')

    // Если сегодня раньше 1 сентября, берём 1 сентября прошлого года
    return today.isBefore(septemberFirst)
      ? dayjs(`01-09-${currentYear - 1}`, 'DD-MM-YYYY')
      : septemberFirst
  }

  const today = dayjs()
  const isSunday = today.isoWeekday() === 7

  // Используем currentWeek для сдвига
  const monday = isSunday
    ? dayjs().isoWeekday(1 + 7 * (currentWeek + 1))
    : dayjs().isoWeekday(1 + 7 * currentWeek)

  const startOfYear = getStartOfYear()

  // Находим понедельник недели, содержащей 1 сентября
  const startOfYearMonday =
    startOfYear.isoWeekday() === 1 ? startOfYear : startOfYear.isoWeekday(1)

  // Считаем разницу в неделях между понедельниками
  const weekIndex = monday.diff(startOfYearMonday, 'week')

  // Чётность недели (0 или 1)
  const weekNumber = Math.abs(weekIndex) % 2

  return weekNumber
}
