import ClassNames from 'classnames'

import styles from './Input.styl'

interface InputProps {
  type: 'text' | 'number' | 'email'
  placeholder: string
  value?: string | number
  defaultValue?: string | number
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  classname?: string
}

export const Input = ({
  type,
  value,
  defaultValue,
  placeholder,
  onchange,
  classname,
}: InputProps) => {
  return (
    <input
      className={ClassNames(styles.Input, classname)}
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onchange}
    />
  )
}
