import { AxiosResponse } from 'axios'

import { API } from '../axios'
import { IBaseApiParams } from '../api'
import { API_PATHS } from '../api_paths'

export interface IGetScheduleAudience extends IBaseApiParams {}

/**
 * Ручка, запрашивающая данные с расписанием по аудитории
 * @param {string} audienceName
 * @returns {Promise<AxiosResponse>}
 */
export const getScheduleAudience = async ({
  name,
  weekNumber,
  lang = 'ru',
}: IGetScheduleAudience): Promise<AxiosResponse> => {
  const response = await API.get(`${API_PATHS.schedule.audience}`, {
    params: {
      name,
      weekNumber,
      lang,
    },
  })
  return response
}
