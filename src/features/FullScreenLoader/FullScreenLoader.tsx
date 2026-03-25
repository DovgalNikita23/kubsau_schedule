import { Box } from '@mui/material'
import { Loader } from '@shared/ui'
import { ReactElement } from 'react'

/**
 * Фича, отображающая лоадер загрузки
 * @returns {ReactElement}
 */
export const FullScreenLoader = (): ReactElement => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Loader size="50px" />
    </Box>
  )
}
