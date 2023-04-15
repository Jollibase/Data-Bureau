import { isValidElement, cloneElement } from 'react'

import { ReactComponent as Loader } from '@Images/loading.svg'

import ClassName from 'classnames'

import styles from './Button.styl'

interface ButtonProps {
  text: React.ReactNode
  onclick: VoidFunction
  classname?: string
  primary?: boolean
  secondary?: boolean
  inverse?: boolean
  disabled?: boolean
  loading?: boolean
  logo?:
    | React.ReactElement
    | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
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
      return isValidElement(Logo) ? (
        cloneElement(Logo as React.ReactElement, { className: 'btn__logo' })
      ) : (
        <Logo className="btn__logo" />
      )
    }
    return ''
  }
  return (
    <div
      role="button"
      className={ClassName(styles.Button, classname, {
        [styles.Secondary]: secondary,
        [styles.Primary]: primary,
        inverse,
        disabled,
      })}
      onClick={onclick}>
      {text}
      {!loading && renderLogo()}
      {loading && <Loader />}
    </div>
  )
}
