import { API } from '../axios'
import { API_PATHS } from '../api_paths'

/**
 * Ручка, запрашивающая данные с расписанием по преподавателю
 * @param {string} groupName
 * @returns {Promise<object>}
 */
export const getScheduleTeacher = async (
  teacherName: string
): Promise<object> => {
  const response = await API.get(`${API_PATHS.schedule.teacher}/${teacherName}`)
  return response
}
