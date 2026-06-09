import { AxiosResponse } from 'axios'

import { API } from '../axios'
import { IBaseApiParams } from '../api'
import { API_PATHS } from '../api_paths'

export interface IGetScheduleTeacher extends IBaseApiParams {}

/**
 * Ручка, запрашивающая данные с расписанием по преподавателю
 * @param {string} groupName
 * @returns {Promise<AxiosResponse>}
 */
export const getScheduleTeacher = async ({
  name,
  weekNumber,
  lang = 'ru',
}: IGetScheduleTeacher): Promise<AxiosResponse> => {
  const response = await API.get(`${API_PATHS.schedule.teacher}`, {
    params: {
      name,
      weekNumber,
      lang,
    },
  })

  return response
}
