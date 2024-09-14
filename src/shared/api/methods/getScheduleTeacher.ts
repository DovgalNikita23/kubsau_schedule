import { API } from '../axios'
import { API_PATHS } from '../api_paths'

export const getScheduleTeacher = async (teacherName: string) => {
  const response = await API.get(`${API_PATHS.schedule.teacher}/${teacherName}`)
  return response
}
