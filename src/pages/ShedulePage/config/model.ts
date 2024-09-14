import { createEffect, createEvent, createStore, sample } from 'effector'
import {
  getHealthCheck,
  getScheduleAudience,
  getScheduleGroup,
  getScheduleTeacher,
} from '@shared/api/methods'
import { or, pending } from 'patronum'
import { AxiosError } from 'axios'
import { createGate } from 'effector-react'
import { REQUEST_STATUSES } from '@shared/constants'

//Gate---------------------------------------------------------------------------
export const ShedulePageGate = createGate('')

//effects---------------------------------------------------------------------------
export const getHealthCheckFx = createEffect(getHealthCheck)
export const getScheduleTeacherFx = createEffect(getScheduleTeacher)
export const getScheduleGroupFx = createEffect(getScheduleGroup)
export const getScheduleAudienceFx = createEffect(getScheduleAudience)

//events---------------------------------------------------------------------------
export const setInputValueHandler = createEvent<string>()
export const searchInputHandlerEvent = createEvent<void>()

//stores---------------------------------------------------------------------------
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

export const $isScheduleDataLoading = or(
  pending([getScheduleTeacherFx, getScheduleGroupFx, getScheduleAudienceFx])
)

export const $scheduleData = createStore(null)
  .on(getScheduleTeacherFx.doneData, (_, { data }) => data)
  .on(getScheduleGroupFx.doneData, (_, { data }) => data)
  .on(getScheduleAudienceFx.doneData, (_, { data }) => data)
  .reset([
    getScheduleTeacherFx.failData,
    getScheduleGroupFx.failData,
    getScheduleAudienceFx.failData,
  ])

//samples---------------------------------------------------------------------------
// Для проверки работоспособности api
sample({
  clock: ShedulePageGate.open,
  target: getHealthCheckFx,
})

//Для обработки ошибки пустого инпута по нажатии/вторичному вводу значения в input
sample({
  clock: [searchInputHandlerEvent, setInputValueHandler],
  source: $inputValue,
  fn: (inputValue) => inputValue.trim() === '',
  target: $isInputValueEmpty,
})

//Для обработки
sample({
  clock: searchInputHandlerEvent,
  source: { inputValue: $inputValue, isInputValueEmpty: $isInputValueEmpty },
  filter: ({ isInputValueEmpty }) => !isInputValueEmpty,
  fn: ({ inputValue }) => inputValue,
  target: [getScheduleTeacherFx, getScheduleGroupFx, getScheduleAudienceFx],
})
