import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '@shared/constants'
import UStudentLogo from '@app/assets/svg/UStudentLogo.svg'

import styles from '../shedulePage.module.scss'

/**
 * Компонент отображения лого
 * @returns {ReactElement}
 */
function Logo(): ReactElement {
  return (
    <div className={styles.logoBlock}>
      <div className={styles.logo}>
        <Link
          to={ROUTE_PATHS.index}
          children={<UStudentLogo width="100%" height="100%" />}
        />
      </div>
    </div>
  )
}

export default Logo
