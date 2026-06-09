import { AxiosResponse } from 'axios'

import { API } from '../axios'
import { IBaseApiParams } from '../api'
import { API_PATHS } from '../api_paths'

export interface IGetScheduleGroup extends IBaseApiParams {}

/**
 * Ручка, запрашивающая данные с расписанием по группе
 * @param {string} groupName
 * @returns {Promise<AxiosResponse>}
 */
export const getScheduleGroup = async ({
  name,
  weekNumber,
  lang = 'ru',
}: IGetScheduleGroup): Promise<AxiosResponse> => {
  const response = await API.get(`${API_PATHS.schedule.group}`, {
    params: {
      name,
      weekNumber,
      lang,
    },
  })
  return response
}
