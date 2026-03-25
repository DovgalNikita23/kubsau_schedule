import { API } from '../axios'
import { API_PATHS } from '../api_paths'

/**
 * Ручка, запрашивающая данные с расписанием по группе
 * @param {string} groupName
 * @returns {Promise<object>}
 */
export const getScheduleGroup = async (groupName: string): Promise<object> => {
  const response = await API.get(`${API_PATHS.schedule.group}/${groupName}`)
  return response
}
