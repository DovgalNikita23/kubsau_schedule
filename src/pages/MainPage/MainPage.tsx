import styles from './mainPage.module.scss'

export const MainPage = () => {
  return (
    <div className={styles.root}>
      <div data-testid="content">Content here</div>
    </div>
  )
}
