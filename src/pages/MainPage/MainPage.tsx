import { MainPageContext } from './config'
import styles from './mainPage.module.scss'
import { useState } from 'react'

export const MainPage = () => {
  const [isShowSnackBar, setIsShowSnackBar] = useState<boolean>(false)

  return (
    <MainPageContext.Provider value={{ isShowSnackBar, setIsShowSnackBar }}>
      <div className={styles.root}>
        <div data-testid="content">Content here</div>
      </div>
    </MainPageContext.Provider>
  )
}
