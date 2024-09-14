import { createEffect, createEvent, createStore, sample } from 'effector'
import { or, pending } from 'patronum'
import { AxiosError } from 'axios'
import { createGate } from 'effector-react'
import { getHealthCheck } from '@shared/api/methods'
import { REQUEST_STATUSES } from '@shared/constants'

//Gate
export const ShedulePageGate = createGate('')

//effects
export const getHealthCheckFx = createEffect(getHealthCheck)

//events
export const setInputValueHandler = createEvent<string>()
export const searchInputHandlerEvent = createEvent<void>()

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

export const $inputValue = createStore<string>('').on(
  setInputValueHandler,
  (_, payload) => payload
)
export const $isInputValueEmpty = createStore<boolean>(false)

//samples
sample({
  clock: ShedulePageGate.open,
  target: getHealthCheckFx,
})

sample({
  clock: [searchInputHandlerEvent, setInputValueHandler],
  source: $inputValue,
  fn: (inputValue) => inputValue.trim() === '',
  target: $isInputValueEmpty,
})
