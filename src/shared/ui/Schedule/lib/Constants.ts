import { IBaseApiResult } from '@shared/api'

export enum LESSONS {
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
  SIXTH,
}

export const DAY_LESSONS: Record<
  LESSONS,
  Pick<IBaseApiResult, 'startTime' | 'endTime'>
> = {
  [LESSONS.FIRST]: {
    startTime: '08:00',
    endTime: '09:30',
  },
  [LESSONS.SECOND]: {
    startTime: '09:45',
    endTime: '11:15',
  },
  [LESSONS.THIRD]: {
    startTime: '11:30',
    endTime: '13:00',
  },
  [LESSONS.FOURTH]: {
    startTime: '13:50',
    endTime: '15:20',
  },
  [LESSONS.FIFTH]: {
    startTime: '15:35',
    endTime: '17:05',
  },
  [LESSONS.SIXTH]: {
    startTime: '17:20',
    endTime: '18:50',
  },
}
