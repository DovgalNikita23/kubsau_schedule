import { FC } from 'react'
import { getSxModel } from './config'
import { IButton } from './config'
import { Button as MUIButton } from '@mui/material'
import styles from './button.module.scss'

export const Button: FC<IButton> = ({
  children,
  type = 'submit',
  dataTestId,
  color = 'inherit',
  fontColor = 'inherit',
  variant = 'contained',
  fontSize = '24px',
  border,
  borderRadius,
  backgroundColor,
  disabled = false,
  endIcon,
  startIcon,
  onClick,
  onMouseOver,
  onMouseLeave,
  onMouseUp,
  onMouseDown,
  sx = getSxModel({
    fontSize,
    fontColor,
    border,
    borderRadius,
    backgroundColor,
  }),
}) => {
  return (
    <MUIButton
      type={type}
      data-testid={dataTestId}
      color={color}
      variant={variant}
      sx={sx}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      className={styles.button}
    >
      {children}
    </MUIButton>
  )
}
