import { CircularProgress, CircularProgressProps } from '@mui/material'
import { FC } from 'react'
import styles from '@app/assets/variables/_colors.module.scss'

export const Loader: FC<CircularProgressProps> = (
  props: CircularProgressProps
) => {
  return (
    <CircularProgress
      {...props}
      sx={{
        color: styles.Primary,
      }}
    />
  )
}
