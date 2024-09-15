import { Button, ButtonProps } from '@mui/material'
import colors from '@app/assets/variables/_colors.module.scss'
import { FC } from 'react'

interface ITextButton extends ButtonProps {
  caption: React.ReactNode
  textColor?: string
  width?: string
  height?: string
  borderColor?: string
  backgroundColor?: string
}

export const TextButton: FC<ITextButton> = ({
  caption,
  textColor = colors.OutlinedButtonText,
  width = '100%',
  height = '100%',
  borderColor = colors.OutlinedButtonBorder,
  backgroundColor = colors.OutlinedButtonBackground,
  ...props
}) => {
  return (
    <Button
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Roboto-Medium',
        color: textColor,
        border: `1px solid ${borderColor}`,
        backgroundColor,
        width,
        height,
        textTransform: 'none',
      }}
      {...props}
    >
      {caption}
    </Button>
  )
}
