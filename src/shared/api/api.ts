/**
 * Базовый api dto-интерфейс
 */
export interface IBaseApiParams {
  name: string
  weekNumber: number
  lang?: string
}

/**
 * Базовый интерфейс результат вызова методов получения расписания
 */
export interface IBaseApiResult {
  id: number
  weekNumber: number
  date: number
  startTime: string
  endTime: string
  isLecture: boolean
  teacher: string
  teacherCardLink: string
  lesson: string
  audience: string
  group: string
}
