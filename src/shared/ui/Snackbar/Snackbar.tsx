import { FC, useCallback, useContext } from 'react'
import Slide, { SlideProps } from '@mui/material/Slide'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import { ShedulePageContext } from '@pages/ShedulePage'

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" timeout={500} />
}

export const SnackBar: FC<SnackbarProps> = ({
  open = false,
  message = 'Сообщение не найдено',
  autoHideDuration = 1000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  onClick,
  onClose,
}) => {
  const { isShowSnackBar, setIsShowSnackBar } = useContext(ShedulePageContext)

  const handleClose = useCallback(() => {
    setIsShowSnackBar(false)
  }, [isShowSnackBar])

  return (
    <Snackbar
      open={isShowSnackBar ?? open}
      anchorOrigin={anchorOrigin}
      message={message}
      onClick={onClick}
      onClose={handleClose ?? onClose}
      TransitionComponent={SlideTransition}
      key="SnackBar"
      autoHideDuration={autoHideDuration}
    />
  )
}
