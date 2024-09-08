import './pagination.module.scss'
import { FC, useCallback, useMemo, useState } from 'react'
import { Pagination as PaginataionAntd, PaginationProps } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { getWeekDays } from '@shared/utils'

export const Pagination: FC<PaginationProps> = (props) => {
  const [currentWeek, setCurrentWeek] = useState<number>(0)

  const weekDays = useMemo(() => getWeekDays(currentWeek), [currentWeek]) //функция получения недель с наборами данных
  const currentWeekday =
    dayjs().isoWeekday() > 6 ? dayjs().isoWeekday() - 1 : dayjs().isoWeekday() //текущий номер дня недели

  const [currentDay, setCurrentDay] = useState<number>(currentWeekday) //стейт для управляемого контрола текущего дня в Pagination

  const handlePrev = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setCurrentWeek((prev) => prev - 1)
    setCurrentDay((prev) => prev)
  }

  const handleNext = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setCurrentWeek((next) => next + 1)
  }

  const handleCurrent = (
    e: React.MouseEvent<HTMLSpanElement>,
    dayOfWeekNum: number
  ) => {
    e.stopPropagation()
    setCurrentDay(dayOfWeekNum)
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
          className={classNames('PaginationItem', {
            active: currentDay === currentDayValue.day_of_week_num,
          })}
          onClick={(e) => handleCurrent(e, currentDayValue.day_of_week_num)}
        >
          <div className="dayNumber">{currentDayValue.day_of_week_str}</div>
          <div className="weekDay">{currentDayValue.day_of_week}</div>
        </div>
      )
    },
    [weekDays, currentDay]
  )

  return (
    <PaginataionAntd
      {...props}
      itemRender={itemRender}
      onChange={null}
      current={currentDay || (currentWeekday > 6 ? 6 : currentWeekday)}
    />
  )
}
