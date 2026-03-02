import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { ROUTE_PATHS } from '@shared/constants'
import { Link as RouterLink } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { TextButton } from '../TextButton'
import styles from './FullScheduleButton.module.scss'

/**
 * Компонент-кнопка, перемещающая на страницу с полным расписанием
 * @returns {ReactElement}
 */
function FullScheduleButton(): ReactElement {
  const { t } = useTranslation()

  return (
    <RouterLink
      className={styles.fullScheduleButton}
      to={ROUTE_PATHS.fullSchedule}
      children={
        <TextButton
          caption={t('Полное расписание')}
          endIcon={<KeyboardArrowRightIcon />}
        />
      }
    />
  )
}

export default FullScheduleButton
