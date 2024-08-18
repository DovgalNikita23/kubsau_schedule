import { Button } from '@shared/ui'
import styles from './mainPage.module.scss'

export const MainPage = () => {
  return (
    <div className={styles.root}>
      <div data-testid="content">Content here</div>
      <Button
        dataTestId="button"
        type="submit"
        borderRadius="100px"
        fontSize="18px"
        onClick={() => alert('Привет')}
      >
        Кликни по мне
      </Button>
      <Button>Click</Button>
    </div>
  )
}
