import { useCallback, useState } from 'react'
import { SnackbarProps } from '@mui/material'

import { SnackBar as SnackBarComponent } from '../Snackbar'

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
