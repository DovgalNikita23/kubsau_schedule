import { ButtonProps } from '@mui/material'
import { TSize } from '@shared/interfaces'

export interface IButton extends ButtonProps {
  children: React.ReactNode
  type?: 'submit' | 'button'
  dataTestId?: string
  fontSize?: TSize
  fontColor?: string
  borderRadius?: string
  backgroundColor?: string
  border?: string
  padding?: string
  margin?: string
}
