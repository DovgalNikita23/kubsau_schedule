import colors from '@app/assets/variables/_colors.module.scss'
import { IButton } from './IButton.interface'

export const getSxModel = ({ ...props }: Omit<IButton, 'children'>) => {
  return {
    fontSize: props?.fontSize ?? '24px',
    fontFamily: 'Montserrat-SemiBold',
    color: props?.fontColor ?? colors.GREY_1,
    borderRadius: props?.borderRadius ?? '10px',
    backgroundColor: props?.backgroundColor ?? 'transparent',
    boxShadow: 'none',
    border: props?.border ?? `3px solid ${colors.GREY_1}`,
    padding: props?.padding ?? '5px 20px',
    margin: props?.margin ?? 0,
    '&:hover': {
      boxShadow: 'none',
    },
  }
}
