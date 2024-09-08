import './Input.module.scss'
import styles from '@app/assets/variables/_colors.module.scss'
import { StandardTextFieldProps, TextField } from '@mui/material'
import { FC } from 'react'

interface IInput extends StandardTextFieldProps {
  width?: string
  height?: string
  placeholder?: string
  focusColor?: string
  backgroundColor?: string
}

export const Input: FC<IInput> = ({
  width = '100%',
  height = '100%',
  placeholder = 'Введите ...',
  focusColor = styles.Primary,
  backgroundColor = styles.Surface,
}) => {
  return (
    <TextField
      sx={{
        width: width,
        height: height,
        '& .MuiOutlinedInput-root': {
          backgroundColor: backgroundColor,
          '& fieldset': {
            borderColor: '#E5E6E1', // Стандартный цвет обводки
          },
          '&:hover fieldset': {
            borderColor: 'gray', // Цвет обводки при наведении
          },
          '&.Mui-focused fieldset': {
            borderColor: focusColor, // Цвет обводки при фокусе
          },
        },
        '& .MuiInputLabel-root': {
          color: '#aaa', // Стандартный цвет текста label
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: focusColor, // Цвет label при фокусе
        },
      }}
      label={placeholder}
    />
  )
}
