import { API } from '../axios'
import { API_PATHS } from '../api_paths'

export const getScheduleGroup = async (groupName: string) => {
  const response = await API.get(`${API_PATHS.schedule.group}/${groupName}`)
  return response
}
