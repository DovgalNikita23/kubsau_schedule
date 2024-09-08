import dayjs from 'dayjs'

export const getFormatDate = (date: string, pattern: string) => {
  return dayjs(date).format(pattern)
}
