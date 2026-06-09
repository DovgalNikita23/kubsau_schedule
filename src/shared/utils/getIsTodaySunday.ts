import { getCurrentWeekDay } from './getCurrentWeekDay'

/**
 * Возвращает признак, что сегодня воскресенье
 * @returns {boolean}
 */
export function getIsTodaySunday(): boolean {
  return getCurrentWeekDay() > 6
}
