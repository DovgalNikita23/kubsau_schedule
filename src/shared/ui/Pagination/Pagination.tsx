import './pagination.module.scss'
import { Pagination as PaginataionAntd, PaginationProps } from 'antd'
import { FC } from 'react'

export const Pagination: FC<PaginationProps> = (props) => {
  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement
  ) => {
    if (type === 'prev') {
      return originalElement
    }
    if (type === 'next') {
      return originalElement
    }

    return (
      <div className="PaginationItem">
        <div className="dayNumber">04</div>
        <div className="weekDay">Пн</div>
      </div>
    )
  }

  return (
    <PaginataionAntd {...props} itemRender={itemRender} defaultCurrent={1} />
  )
}
