import { API } from '../axios'
import { API_PATHS } from '../api_paths'

export interface IGetHealthCheck {
  message: string
  detail: string
}

/**
 * Ручка, проверяющая связь с БД
 */
export const getHealthCheck = async () => {
  const response = await API.get(API_PATHS.schedule.audience, {
    params: {
      name: 'ПИ2301',
    },
  })
  return response
}
