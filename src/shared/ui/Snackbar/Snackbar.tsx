import { ReactElement } from 'react'
import Slide, { SlideProps } from '@mui/material/Slide'
import Snackbar, {
  SnackbarProps as ISnackbarProps,
} from '@mui/material/Snackbar'

/**
 * Компонент со слайд эффектом
 * @param {SlideProps} [props]
 * @returns {ReactElement}
 */
function SlideTransition(props: SlideProps): ReactElement {
  return <Slide {...props} direction="left" timeout={500} />
}

/**
 * Информационный снекбар
 * @param {IShedulePageHeader} [props]
 * @returns {ReactElement}
 */
export const SnackBar = ({
  open = false,
  message = 'Некорректные данные',
  autoHideDuration = 1500,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  onClick = null,
  onClose,
}: ISnackbarProps): ReactElement => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      message={message}
      onClick={onClick}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      key="SnackBar"
      autoHideDuration={autoHideDuration}
    />
  )
}
