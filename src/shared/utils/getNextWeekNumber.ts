import { WEEK_NUMBERS } from '@shared/constants'

/**
 * Возвращает номер следующей недели
 * @param  {WEEK_NUMBERS} weekNumber
 * @returns {WEEK_NUMBERS}
 */
export function getNextWeekNumber(weekNumber: WEEK_NUMBERS): WEEK_NUMBERS {
  switch (weekNumber) {
    case WEEK_NUMBERS.FIRST:
      return WEEK_NUMBERS.SECOND
    case WEEK_NUMBERS.SECOND:
      return WEEK_NUMBERS.FIRST
    default:
      return WEEK_NUMBERS.FIRST
  }
}
