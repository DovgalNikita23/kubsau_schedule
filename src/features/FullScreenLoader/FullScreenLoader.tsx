import { Box } from '@mui/material'
import { Loader } from '@shared/ui'

export const FullScreenLoader = () => {
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
