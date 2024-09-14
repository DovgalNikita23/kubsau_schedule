import './iconButton.module.scss'
import IconButtonMui, { IconButtonProps } from '@mui/material/IconButton'
import colors from '@app/assets/variables/_colors.module.scss'
import { FC } from 'react'

interface IIconButtonProps extends IconButtonProps {
  children: React.ReactNode
  iconColor?: string
  backgroundColor?: string
  width?: string
  height?: string
}

export const IconButton: FC<IIconButtonProps> = ({
  children,
  iconColor = colors.Background,
  backgroundColor = colors.Green,
  width = '50px',
  height = '50px',
  ...props
}) => {
  return (
    <IconButtonMui
      {...props}
      color={iconColor}
      sx={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        border: `1px solid ${colors.Green}`,
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: colors.Primary,
        },
      }}
    >
      {children}
    </IconButtonMui>
  )
}
