import { createContext, Dispatch, SetStateAction } from 'react'

export interface IMainPageContext {
  isShowSnackBar?: boolean
  setIsShowSnackBar?: Dispatch<SetStateAction<boolean>>
}

export const MainPageContext = createContext<IMainPageContext | null>({})
