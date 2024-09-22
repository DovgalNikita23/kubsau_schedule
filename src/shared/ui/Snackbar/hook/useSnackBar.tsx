import { useCallback, useState } from 'react'
import { SnackBar as SnackBarComponent } from '../Snackbar'
import { SnackbarProps } from '@mui/material'

export const useSnackBar = ({
  message = 'Некорректные данные',
  ...props
}: SnackbarProps) => {
  const [isShow, setIsShow] = useState<boolean>(true)
  const [messageText, setMessageText] = useState<string>(null)

  const handleShowSnackBar = useCallback((message = 'Некорректные данные') => {
    setMessageText(message)
    setIsShow(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsShow(false)
  }, [])

  return {
    SnackBar: (
      <SnackBarComponent
        open={isShow}
        message={messageText || message}
        onClose={handleClose}
        {...props}
      />
    ),
    handleShowSnackBar,
    handleClose,
  }
}
