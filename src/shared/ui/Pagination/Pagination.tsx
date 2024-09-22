import './pagination.module.scss'
import { FC, useCallback, useMemo, useState } from 'react'
import { Pagination as PaginataionAntd, PaginationProps } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { getWeekDays } from '@shared/utils'

interface IPagination extends PaginationProps {
  // eslint-disable-next-line
  onDayChange?: (weekNumber: number, dayOfWeekNum: number) => void
}

export const Pagination: FC<IPagination> = (props) => {
  const currentWeekday = dayjs().isoWeekday() > 6 ? 1 : dayjs().isoWeekday() // Если сегодня воскресенье, вернем понедельник для отображения следующей недели, иначе текущий день
  const currentWeekCalc = dayjs().isoWeekday() > 6 ? 1 : 0 // Если сегодня воскресенье, вернем следующую неделю (0), иначе текущую

  const [currentWeek, setCurrentWeek] = useState<number>(currentWeekCalc) //Стейт для переключателя карусели пагинации недель (на текущую/следующую)

  const weekDays = useMemo(() => getWeekDays(currentWeek), [currentWeek]) //функция получения недель с наборами данных

  const [currentDay, setCurrentDay] = useState<number>(currentWeekday) //стейт для управляемого контрола текущего дня в Pagination
  const [сurrentChosenDay, setCurrentChosenDay] = useState<number>(null) //стейт для управляемого контрола выбранного дня в Pagination

  const handlePrev = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    if (currentWeek > 0) {
      setCurrentChosenDay(null)
      setCurrentWeek((prev) => prev - 1)
      setCurrentDay((prev) => prev)
    }
  }

  const handleNext = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    if (currentWeek < 1) {
      setCurrentChosenDay(null)
      setCurrentWeek((next) => next + 1)
    }
  }

  const handleCurrent = (
    e: React.MouseEvent<HTMLSpanElement>,
    dayOfWeekNum: number
  ) => {
    e.stopPropagation()
    setCurrentChosenDay(dayOfWeekNum)
    // Возвращаем текущий день и номер недели через пропс onDayChange
    if (props.onDayChange) {
      const currentDayValue = weekDays.find(
        (day) => day.day_of_week_num === dayOfWeekNum
      )
      if (currentDayValue) {
        props.onDayChange(currentWeek, dayOfWeekNum)
      }
    }
  }

  const itemRender: PaginationProps['itemRender'] = useCallback(
    (_, type, originalElement) => {
      const currentDayValue = weekDays[+_ - 1]

      if (type === 'prev') {
        return <span onClick={handlePrev}>{originalElement}</span>
      }

      if (type === 'next') {
        return <span onClick={handleNext}>{originalElement}</span>
      }

      return (
        <div
          className={classNames('PaginationItem', [
            {
              activeChosen:
                сurrentChosenDay === currentDayValue.day_of_week_num,
              active:
                currentDay === currentDayValue.day_of_week_num &&
                currentWeek === currentWeekCalc,
            },
          ])}
          onClick={(e) => handleCurrent(e, currentDayValue.day_of_week_num)}
        >
          <div className="dayNumber">{currentDayValue.day_of_week_str}</div>
          <div className="weekDay">{currentDayValue.day_of_week}</div>
        </div>
      )
    },
    [weekDays, currentDay, сurrentChosenDay]
  )

  return (
    <PaginataionAntd
      {...props}
      itemRender={itemRender}
      onChange={null}
      current={
        (сurrentChosenDay ?? currentDay) ||
        (currentWeekday > 6 ? 6 : currentWeekday)
      }
    />
  )
}
