import { createEffect, createStore } from 'effector'
import { or, pending } from 'patronum'
import { AxiosError } from 'axios'
import { getHealthCheck } from '@shared/api/methods'
import { REQUEST_STATUSES } from '@shared/constants'

//effects
export const getHealthCheckFx = createEffect(getHealthCheck)
getHealthCheckFx()

//stores
export const $failConnect = createStore<boolean>(false)
  .on(getHealthCheckFx.failData, () => true)
  .on(getHealthCheckFx.doneData, () => false)

export const $failConnectInfo = createStore<string>(null).on(
  getHealthCheckFx.failData,
  (_, payload: AxiosError) => {
    const statusCode = payload?.response?.status
    return statusCode
      ? REQUEST_STATUSES[statusCode]
      : REQUEST_STATUSES['unknown']
  }
)

export const $successConnectInfo = createStore<string>(null).on(
  getHealthCheckFx.doneData,
  (_, payload) => {
    const statusCode = payload?.status
    return REQUEST_STATUSES[statusCode]
  }
)

export const $isLoading = or(pending([getHealthCheckFx]), $failConnect)
