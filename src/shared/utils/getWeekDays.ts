import dayjs from 'dayjs'
import { getCurrentWeek } from './getCurrentWeek'
import isoWeek from 'dayjs/plugin/isoWeek'

interface IGetWeekDays {
  id: number
  day_of_week: string // ПН, ВТ...СБ
  day_of_week_str: string // строковое представление дня месяца
  day_of_week_num: number // номер дня недели
  week_number: number // номер недели: 0 или 1 (первая/вторая неделя)
}

dayjs.extend(isoWeek)

export const getWeekDays = (currentWeek = 0): IGetWeekDays[] => {
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  // Определяем, является ли сегодня воскресеньем
  const today = dayjs()

  // Если воскресенье, сдвигаем на одну неделю вперед
  const monday = today.isoWeekday(1 + 7 * currentWeek)

  const weekNumber = getCurrentWeek(currentWeek) // Номер недели: 0 или 1

  const week: IGetWeekDays[] = []

  // Создаем массив объектов от понедельника до субботы
  for (let i = 0; i < 6; i++) {
    const currentDay = monday.add(i, 'day')
    week.push({
      id: i + 1,
      day_of_week: daysOfWeek[i],
      day_of_week_str: currentDay.format('DD'), // Форматируем день месяца как строку
      day_of_week_num: i + 1, // Номер дня недели, начиная с понедельника
      week_number: weekNumber, // Номер недели: 0 или 1
    })
  }

  return week
}
