import { API } from '../axios'
import { API_PATHS } from '../api_paths'

/**
 * Ручка, запрашивающая данные с расписанием по аудитории
 * @param {string} audienceName
 * @returns {Promise<object>}
 */
export const getScheduleAudience = async (
  audienceName: string
): Promise<object> => {
  const response = await API.get(
    `${API_PATHS.schedule.audience}/${audienceName}`
  )
  return response
}
