import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { ReactElement } from 'react'
import { ROUTE_PATHS } from '@shared/constants'
import { Link as RouterLink } from 'react-router-dom'
import styles from './FullScheduleButton.module.scss'
import { TextButton } from '../TextButton'

/**
 * Компонент-кнопка, перемещающая на страницу с полным расписанием
 * @returns {ReactElement}
 */
function FullScheduleButton(): ReactElement {
  return (
    <RouterLink
      className={styles.fullScheduleButton}
      to={ROUTE_PATHS.fullSchedule}
      children={
        <TextButton
          caption="Полное расписание"
          endIcon={<KeyboardArrowRightIcon />}
        />
      }
    />
  )
}

export default FullScheduleButton
