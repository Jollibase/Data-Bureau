import ClassName from 'classnames'
import { cloneElement } from 'react'

import { ReactComponent as Loader } from '@Images/loading.svg'

import styles from './Button.styl'

interface ButtonProps {
  text?: React.ReactNode
  onclick: VoidFunction
  classname?: string
  primary?: boolean
  secondary?: boolean
  inverse?: boolean
  disabled?: boolean
  loading?: boolean
  logo?: React.ReactElement
}

export const Button = ({
  text,
  onclick,
  classname,
  primary,
  secondary,
  inverse,
  disabled,
  loading,
  logo,
}: ButtonProps) => {
  const renderLogo = () => {
    const Logo = logo
    if (logo) {
      return cloneElement(Logo as React.ReactElement, {
        className: 'btn__logo',
      })
    }
    return ''
  }
  return (
    <div
      className={ClassName(styles.Button, classname, {
        [styles.Secondary]: secondary,
        [styles.Primary]: primary,
        inverse,
        disabled,
      })}
      role="button"
      tabIndex={0}
      onClick={disabled ? () => null : onclick}>
      <span>{text}</span>
      {!loading && renderLogo()}
      {loading && <Loader />}
    </div>
  )
}
