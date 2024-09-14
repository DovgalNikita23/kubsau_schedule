import { API } from '../axios'
import { API_PATHS } from '../api_paths'

export const getScheduleAudience = async (audienceName: string) => {
  const response = await API.get(
    `${API_PATHS.schedule.audience}/${audienceName}`
  )
  return response
}
