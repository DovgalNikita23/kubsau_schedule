import './pagination.module.scss'
import PaginationMUI, { PaginationProps } from '@mui/material/Pagination'
import { FC } from 'react'
import PaginationItem from '@mui/material/PaginationItem'

export const Pagination: FC<PaginationProps> = (props: PaginationProps) => {
  return (
    <PaginationMUI
      count={7}
      {...props}
      renderItem={(item) => <PaginationItem {...item}></PaginationItem>}
    />
  )
}
