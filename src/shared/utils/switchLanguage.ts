import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import dayjs from 'dayjs'
import i18next from 'i18next'
import { LANG } from '@shared/constants'

/**
 * Функция смены локали
 * @param {LANG} lang
 */
export const switchLanguage = (lang: LANG) => {
  dayjs.locale(lang)
  i18next.changeLanguage(lang)
}
