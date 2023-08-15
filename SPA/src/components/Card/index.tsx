import classNames from 'classnames'

import styles from './Card.styl'
import React from 'react'

interface CardProps {
  classname?: string
  headerContent?: React.ReactNode
  children: React.ReactNode
}

export const Card = ({ classname, headerContent, children }: CardProps) => {
  return (
    <div className={classNames(styles.Card, classname)}>
      {headerContent && <div className="card__header">{headerContent}</div>}
      <div className="card__body"> {children}</div>
    </div>
  )
}
