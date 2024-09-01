import { ShedulePageContext } from './config'
import styles from './shedulePage.module.scss'
import { useState } from 'react'

export const ShedulePage = () => {
  const [isShowSnackBar, setIsShowSnackBar] = useState<boolean>(false)

  return (
    <ShedulePageContext.Provider value={{ isShowSnackBar, setIsShowSnackBar }}>
      <div className={styles.shedulePage}>
        <div data-testid="content">Content here</div>
      </div>
    </ShedulePageContext.Provider>
  )
}
