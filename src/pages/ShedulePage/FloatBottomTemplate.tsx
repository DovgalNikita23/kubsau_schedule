import React from 'react'

import styles from './shedulePage.module.scss'

interface IFloatBottomTemplate {
  children: React.ReactNode
}

export const FloatBottomTemplate = ({ children }: IFloatBottomTemplate) => {
  return <div className={styles.floatBottomTemplate}>{children}</div>
}
