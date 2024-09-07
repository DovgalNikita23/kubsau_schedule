import './pagination.module.scss'
import { FC, useCallback, useMemo } from 'react'
import { Pagination as PaginataionAntd, PaginationProps } from 'antd'
import dayjs from 'dayjs'
import { getWeekDays } from '@shared/utils'

export const Pagination: FC<PaginationProps> = (props) => {
  const weekDays = useMemo(() => getWeekDays(), [])

  const currentWeekday = dayjs().isoWeekday()

  const itemRender: PaginationProps['itemRender'] = useCallback(
    (_, type, originalElement) => {
      if (type === 'prev' || type === 'next') {
        return originalElement
      }

      const currentDay = weekDays[+_ - 1]

      if (currentDay) {
        return (
          <div className="PaginationItem">
            <div className="dayNumber">{currentDay.day_of_week_str}</div>
            <div className="weekDay">{currentDay.day_of_week}</div>
          </div>
        )
      }

      return originalElement
    },
    [weekDays]
  )

  return (
    <PaginataionAntd
      {...props}
      itemRender={itemRender}
      defaultCurrent={currentWeekday > 6 ? 6 : currentWeekday}
    />
  )
}
