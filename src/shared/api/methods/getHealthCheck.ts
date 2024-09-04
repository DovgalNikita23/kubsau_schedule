import { API } from '../axios'
import { API_PATHS } from '../api_paths'

export interface IGetHealthCheck {
  message: string
  detail: string
}

export const getHealthCheck = async () => {
  const response = await API.get(API_PATHS.pingApp)
  return response
}
