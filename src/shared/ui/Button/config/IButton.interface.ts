import { ButtonProps } from '@mui/material'

export interface IButton extends ButtonProps {
  children: React.ReactNode
  dataTestId?: string
  fontSize?: string
  fontColor?: string
  borderRadius?: string
  backgroundColor?: string
  border?: string
  padding?: string
  margin?: string
}
