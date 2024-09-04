import { useCallback, useState } from 'react'
import { SnackBar as SnackBarComponent } from '../Snackbar'
import { SnackbarProps } from '@mui/material'

export const useSnackBar = (props: SnackbarProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleShowSnackBar = useCallback(() => {
    setIsShow(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsShow(false)
  }, [])

  return {
    SnackBar: (
      <SnackBarComponent open={isShow} onClose={handleClose} {...props} />
    ),
    handleShowSnackBar,
    handleClose,
  }
}
