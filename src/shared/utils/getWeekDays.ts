import dayjs from 'dayjs'
import i18n from 'i18next'
import isoWeek from 'dayjs/plugin/isoWeek'
import { WEEK_DAYS } from '@shared/constants'

import { getCurrentWeek } from './getCurrentWeek'

interface IGetWeekDays {
  id: number
  day_of_week: string // ПН, ВТ...СБ
  day_of_week_str: string // строковое представление дня месяца
  day_of_week_num: number // номер дня недели
  week_number: number // номер недели: 0 или 1 (первая/вторая неделя)
}

dayjs.extend(isoWeek)

/**
 * @funcion Функция получения дней недели
 * @param {number} currentWeek
 * @returns {IGetWeekDays[]}
 */
export const getWeekDays = (currentWeek: number = 0): IGetWeekDays[] => {
  const daysOfWeek = [
    i18n.t(WEEK_DAYS.Mo),
    i18n.t(WEEK_DAYS.Tu),
    i18n.t(WEEK_DAYS.We),
    i18n.t(WEEK_DAYS.Th),
    i18n.t(WEEK_DAYS.Fr),
    i18n.t(WEEK_DAYS.Sa),
    i18n.t(WEEK_DAYS.Su),
  ]

  const today = dayjs()
  const isSunday = today.isoWeekday() === 7

  // Получаем текущий понедельник (с учётом воскресенья)
  let currentMonday: dayjs.Dayjs

  if (isSunday) {
    // В воскресенье "текущая" неделя для отображения - следующая
    currentMonday = today.add(1, 'week').isoWeekday(1)
  } else {
    // В остальные дни - текущая
    currentMonday = today.isoWeekday(1)
  }

  // Сдвигаем на нужное количество недель
  // currentWeek=0 → без сдвига
  // currentWeek=1 → на неделю назад (для воскресенья) или вперёд (для других дней)
  let targetMonday: dayjs.Dayjs

  if (isSunday) {
    // В воскресенье: 0 - текущая (следующая), 1 - предыдущая
    targetMonday = currentMonday.subtract(currentWeek, 'week')
  } else {
    // В другие дни: 0 - текущая, 1 - следующая
    targetMonday = currentMonday.add(currentWeek, 'week')
  }

  // Номер недели для отображения
  const weekNumber = getCurrentWeek(
    isSunday && currentWeek === 1 ? -1 : currentWeek
  )

  const week: IGetWeekDays[] = []

  for (let i = 0; i < 6; i++) {
    const currentDay = targetMonday.add(i, 'day')
    week.push({
      id: i + 1,
      day_of_week: daysOfWeek[i],
      day_of_week_str: currentDay.format('DD'),
      day_of_week_num: i + 1,
      week_number: weekNumber,
    })
  }

  return week
}
