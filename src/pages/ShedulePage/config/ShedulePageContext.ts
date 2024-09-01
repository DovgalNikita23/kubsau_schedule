import { createContext, Dispatch, SetStateAction } from 'react'

export interface IShedulePageContext {
  isShowSnackBar?: boolean
  setIsShowSnackBar?: Dispatch<SetStateAction<boolean>>
}

export const ShedulePageContext = createContext<IShedulePageContext | null>({})
