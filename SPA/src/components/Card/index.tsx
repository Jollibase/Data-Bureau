import classNames from 'classnames'

import styles from './Card.styl'

interface CardProps {
  classname?: string
  headerText?: string
  children: React.ReactNode
}

export const Card = ({ classname, headerText, children }: CardProps) => {
  return (
    <div className={classNames(styles.Card, classname)}>
      {headerText && <div className="card-header"></div>}
      <div className="card__body"> {children}</div>
    </div>
  )
}
