import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

interface IGetWeekDays {
  id: number
  day_of_week: string
  day_of_week_str: string
  day_of_week_num: number
}

dayjs.extend(isoWeek)

export const getWeekDays = (): IGetWeekDays[] => {
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  // Получаем понедельник текущей недели
  const monday = dayjs().isoWeekday(1)

  const week = []

  // Создаем массив объектов от понедельника до субботы
  for (let i = 0; i < 6; i++) {
    const currentDay = monday.add(i, 'day')
    week.push({
      id: i + 1,
      day_of_week: daysOfWeek[i],
      day_of_week_str: currentDay.format('DD'), // Форматируем день месяца как строку
      day_of_week_num: i + 1,
    })
  }

  return week
}
