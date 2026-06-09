import './pagination.module.scss'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Pagination as PaginataionAntd, PaginationProps } from 'antd'
import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { getCurrentWeek, getIsTodaySunday, getWeekDays } from '@shared/utils'

interface IPagination extends PaginationProps {
  // eslint-disable-next-line
  onDayChange?: (weekNumber: number, dayOfWeekNum: number) => void
}

/**
 * Компонент с пагинацией
 * @param {IPagination} props
 * @returns {ReactElement}
 */
export const Pagination = ({
  onDayChange,
  ...props
}: IPagination): ReactElement => {
  const isTodaySunday = getIsTodaySunday()

  const currentWeekday = isTodaySunday ? 1 : dayjs().isoWeekday()

  const [currentWeek, setCurrentWeek] = useState<number>(0)
  const [сurrentChosenDay, setCurrentChosenDay] = useState<number | null>(
    currentWeekday
  )

  const { i18n } = useTranslation()

  /**
   * Дни недели с датами для пагинации
   */
  const weekDays = useMemo(
    () => getWeekDays(currentWeek),
    [currentWeek, i18n.language]
  )

  /**
   * Честная текущая неделя, которая отображается
   */
  const honestlyCurrentWeek = useMemo(() => {
    return getCurrentWeek()
  }, [])

  /**
   * Определяем, заблокирована ли кнопка "назад"
   */
  const isPrevDisabled = useMemo(() => {
    if (isTodaySunday) {
      // В воскресенье: "назад" заблокирована когда currentWeek === 1
      return currentWeek === 1
    } else {
      // В другие дни: "назад" заблокирована когда currentWeek === 0
      return currentWeek === 0
    }
  }, [isTodaySunday, currentWeek])

  /**
   * Определяем, заблокирована ли кнопка "вперед"
   */
  const isNextDisabled = useMemo(() => {
    if (isTodaySunday) {
      // В воскресенье: "вперед" заблокирована когда currentWeek === 0
      return currentWeek === 0
    } else {
      // В другие дни: "вперед" заблокирована когда currentWeek === 1
      return currentWeek === 1
    }
  }, [isTodaySunday, currentWeek])

  /**
   * Обработчик клика "назад"
   */
  const handlePrev = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()

      if (isTodaySunday) {
        // В воскресенье: переключаемся с 0 на 1 (показываем текущую неделю 04.05-10.05)
        if (currentWeek === 0) {
          setCurrentChosenDay(null)
          setCurrentWeek(1)
        }
      } else {
        // В другие дни: переключаемся с 1 на 0
        if (currentWeek === 1) {
          setCurrentChosenDay(null)
          setCurrentWeek(0)
        }
      }
    },
    [currentWeek, isTodaySunday]
  )

  /**
   * Обработчик клика "вперед"
   */
  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()

      if (isTodaySunday) {
        // В воскресенье: переключаемся с 1 на 0 (возвращаемся на будущую неделю 11.05-16.05)
        if (currentWeek === 1) {
          setCurrentChosenDay(null)
          setCurrentWeek(0)
        }
      } else {
        // В другие дни: переключаемся с 0 на 1
        if (currentWeek === 0) {
          setCurrentChosenDay(null)
          setCurrentWeek(1)
        }
      }
    },
    [currentWeek, isTodaySunday]
  )

  /**
   * Обработчик клика по элементу карусели (дню недели)
   */
  const handleCurrent = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, dayOfWeekNum: number) => {
      e.stopPropagation()
      setCurrentChosenDay(dayOfWeekNum)
      if (onDayChange) {
        const currentDayValue = weekDays.find(
          (day) => day.day_of_week_num === dayOfWeekNum
        )
        if (currentDayValue) {
          onDayChange(currentWeek, dayOfWeekNum)
        }
      }
    },
    [currentWeek, weekDays, onDayChange]
  )

  /**
   * Определяем, активен ли день (подсветка)
   */
  const isActiveDay = useCallback(
    (dayNum: number, weekNumber: number): boolean => {
      return currentWeekday === dayNum && honestlyCurrentWeek === weekNumber
    },
    [honestlyCurrentWeek, currentWeekday]
  )

  const isActiveChosen = useCallback(
    (dayOfWeekNum: number) => {
      return сurrentChosenDay === dayOfWeekNum
    },
    [сurrentChosenDay]
  )

  /**
   * Колбэк рендера элемента
   */
  const itemRender = useCallback(
    (
      _: number,
      type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
      originalElement: React.ReactNode
    ) => {
      const currentDayValue = weekDays[+_ - 1]

      if (type === 'prev') {
        return (
          <span
            onClick={!isPrevDisabled ? handlePrev : undefined}
            style={{
              opacity: isPrevDisabled ? 0.5 : 1,
              cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
              pointerEvents: isPrevDisabled ? 'none' : 'auto',
            }}
            title="Вернуться назад"
          >
            {originalElement}
          </span>
        )
      }

      if (type === 'next') {
        return (
          <span
            onClick={!isNextDisabled ? handleNext : undefined}
            style={{
              opacity: isNextDisabled ? 0.5 : 2,
              cursor: isNextDisabled ? 'not-allowed' : 'pointer',
              pointerEvents: isNextDisabled ? 'none' : 'auto',
            }}
          >
            {originalElement}
          </span>
        )
      }

      if (!currentDayValue) return null

      return (
        <div
          className={classNames('PaginationItem', {
            activeChosen: isActiveChosen(currentDayValue.day_of_week_num),
            active: isActiveDay(
              currentDayValue.day_of_week_num,
              currentDayValue.week_number
            ),
          })}
          onClick={(e) => handleCurrent(e, currentDayValue.day_of_week_num)}
        >
          <div className="dayNumber" style={{ color: 'green !important' }}>
            {currentDayValue.day_of_week_str}
          </div>
          <div className="weekDay">{currentDayValue.day_of_week}</div>
        </div>
      )
    },
    [
      weekDays,
      isPrevDisabled,
      isNextDisabled,
      handlePrev,
      handleNext,
      isActiveDay,
      handleCurrent,
      isActiveChosen,
    ]
  )

  return (
    <PaginataionAntd
      {...props}
      itemRender={itemRender}
      onChange={null}
      current={сurrentChosenDay ?? undefined}
    />
  )
}
