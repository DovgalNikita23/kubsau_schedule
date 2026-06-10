import React from 'react'
import classNames from 'classnames'

import styles from './shedulePage.module.scss'

interface IFloatBottomTemplate {
  children: React.ReactNode
  hasSearchedData?: boolean
}

export const FloatBottomTemplate = ({
  children,
  hasSearchedData = false,
}: IFloatBottomTemplate) => {
  return (
    <div
      className={classNames(styles.floatBottomTemplate, {
        [styles.hasSearchedData]: hasSearchedData,
      })}
    >
      {children}
    </div>
  )
}
