import Slide, { SlideProps } from '@mui/material/Slide'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import { FC } from 'react'

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" timeout={500} />
}

export const SnackBar: FC<SnackbarProps> = ({
  open = false,
  message = 'Некорректные данные',
  autoHideDuration = 1500,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  onClick = null,
  onClose,
}) => {
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
