import ClassName from 'classnames'

import styles from './Button.styl'

interface ButtonProps {
  text: string
  onclick: VoidFunction
  classname?: string
  primary?: boolean
  secondary?: boolean
  inverse?: boolean
}

export const Button = ({
  text,
  onclick,
  classname,
  primary,
  secondary,
  inverse,
}: ButtonProps) => {
  return (
    <div
      className={ClassName(styles.Button, classname, {
        [styles.Secondary]: secondary,
        [styles.Primary]: primary,
        inverse,
      })}
      onClick={onclick}>
      {text}
    </div>
  )
}
