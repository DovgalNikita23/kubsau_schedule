import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

dayjs.extend(customParseFormat)

/**
 * @funcion Функция получения номера текущей недели - 0/1
 * @param currentWeek
 * @returns
 */
export const getCurrentWeek = (currentWeek: number = 0) => {
  const getStartOfYear = () => {
    const currentYear = dayjs().year()
    return dayjs(`01-09-${currentYear}`, 'DD-MM-YYYY')
  }

  // Получаем понедельник текущей недели
  const today = dayjs()
  const isSunday = today.isoWeekday() === 7

  // Если воскресенье, сдвигаем на одну неделю вперед
  const monday = isSunday
    ? dayjs().isoWeekday(1 + 7 * (currentWeek + 1))
    : dayjs().isoWeekday(1 + 7 * currentWeek)

  // Определяем начало недели относительно 1 сентября текущего года
  const startOfYear = getStartOfYear()
  const weekIndex = monday.diff(startOfYear, 'week')
  const weekNumber = Math.floor((weekIndex + 1) / 2) % 2 // Номер недели: 0 или 1

  return weekNumber
}
