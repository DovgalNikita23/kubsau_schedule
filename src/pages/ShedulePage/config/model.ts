import { AxiosError } from 'axios'
import { or, pending } from 'patronum'
import { createGate } from 'effector-react'
import { IBaseApiResult } from '@shared/api'
import { LANG, REQUEST_STATUSES, WEEK_NUMBERS } from '@shared/constants'
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector'
import {
  getCurrentDay,
  getCurrentWeek,
  getCurrentWeekDay,
  switchLanguage,
} from '@shared/utils'
import {
  getHealthCheck,
  IGetScheduleAudience,
  getScheduleAudience,
  IGetScheduleGroup,
  getScheduleGroup,
  IGetScheduleTeacher,
  getScheduleTeacher,
} from '@shared/api/methods'

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
export const getCurrentWeekEvent = createEvent<number>()
export const getCurrentWeekDayEvent = createEvent<number>()
export const currentWeekEventChanged = createEvent<boolean>()
export const lastDataUpdateDateEvent = createEvent<Date>()
export const langaugeSwitchEvent = createEvent<LANG>(LANG.RU)

//stores---------------------------------------------------------------------------
export const $failConnect = createStore<boolean>(false)
  // TODO: исправить на true
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

export const $scheduleGroupData = createStore<IBaseApiResult[]>([]).on(
  getScheduleGroupFx.doneData,
  (_, { data }) => data
)

export const $scheduleTeacherData = createStore<IBaseApiResult[]>([]).on(
  getScheduleTeacherFx.doneData,
  (_, { data }) => data
)

export const $scheduleAudienceData = createStore<IBaseApiResult[]>([]).on(
  getScheduleAudienceFx.doneData,
  (_, { data }) => data
)

export const $currentWeek = createStore<WEEK_NUMBERS>(getCurrentWeek()).on(
  getCurrentWeekEvent,
  (_, payload) => payload
)
export const $currentWeekChanged = createStore<boolean>(false).on(
  currentWeekEventChanged,
  (_, payload) => payload
)

export const $currentWeekDay = createStore<number>(getCurrentWeekDay()).on(
  getCurrentWeekDayEvent,
  (_, payload) => payload
)

export const $lastDataUpdateDate = createStore<Date | null>(null).on(
  lastDataUpdateDateEvent,
  (_, payload) => getCurrentDay()
)

export const $language = createStore<LANG>(LANG.RU).on(
  langaugeSwitchEvent,
  (_, lang) => {
    switchLanguage(lang)
    return lang
  }
)

// текущая отображаемая учебная группа
export const $currentStudyGroup = createStore<string>('')

// combine stores---------------------------------------------------------------------------
// Общий стор, который объединяет все данные (если нужно)
export const $scheduleData = combine(
  $scheduleGroupData,
  $scheduleTeacherData,
  $scheduleAudienceData,
  (groupData, teacherData, audienceData) => {
    return [...groupData, ...teacherData, ...audienceData]
  }
)

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

//Для получения данных при поиске
sample({
  clock: searchInputHandlerEvent,
  source: {
    language: $language,
    inputValue: $inputValue,
    currentWeek: $currentWeek,
    isInputValueEmpty: $isInputValueEmpty,
  },
  filter: ({ isInputValueEmpty }) => !isInputValueEmpty,
  fn: ({
    language,
    inputValue,
    currentWeek,
  }): IGetScheduleAudience & IGetScheduleGroup & IGetScheduleTeacher => {
    return {
      name: inputValue,
      weekNumber: currentWeek + 1,
      lang: language,
    }
  },
  target: [
    getScheduleTeacherFx,
    getScheduleGroupFx,
    getScheduleAudienceFx,
    lastDataUpdateDateEvent,
  ],
})

//Для получения данных при смене недели
sample({
  clock: currentWeekEventChanged,
  source: {
    language: $language,
    inputValue: $inputValue,
    currentWeek: $currentWeek,
    currentWeekChanged: $currentWeekChanged,
  },
  filter: ({ inputValue, currentWeekChanged }) =>
    !!inputValue && currentWeekChanged,
  fn: ({
    inputValue,
    currentWeek,
    language,
  }): IGetScheduleAudience & IGetScheduleGroup & IGetScheduleTeacher => {
    return {
      name: inputValue,
      weekNumber: currentWeek + 1,
      lang: language,
    }
  },
  target: [
    getScheduleTeacherFx,
    getScheduleGroupFx,
    getScheduleAudienceFx,
    lastDataUpdateDateEvent,
  ],
})

// Для получения данных при смене языка
sample({
  clock: langaugeSwitchEvent,
  source: {
    inputValue: $inputValue,
    currentWeek: $currentWeek,
    language: $language,
  },
  filter: ({ inputValue }) => !!inputValue,
  fn: ({
    inputValue,
    language,
    currentWeek,
  }): IGetScheduleAudience & IGetScheduleGroup & IGetScheduleTeacher => {
    switchLanguage(language)

    return {
      name: inputValue,
      weekNumber: currentWeek + 1,
      lang: language,
    }
  },
  target: [
    getScheduleTeacherFx,
    getScheduleGroupFx,
    getScheduleAudienceFx,
    lastDataUpdateDateEvent,
  ],
})

// Для обновления данных текущей группы отображения расписания
sample({
  clock: $scheduleData,
  fn: (scheduleData: IBaseApiResult[]) => {
    const scheduleDataWithGroup = scheduleData.find(
      (item) => item.group !== '' && item.group !== undefined
    )
    const groupName = scheduleDataWithGroup?.group || ''
    return groupName?.split('/')?.[0]
  },
  target: $currentStudyGroup,
})
