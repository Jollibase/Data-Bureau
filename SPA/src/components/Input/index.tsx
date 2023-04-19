import ClassNames from 'classnames'
import { useField } from 'formik'

import { InputError } from '../InputError'

import styles from './Input.styl'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'phone' | 'checkbox'
  placeholder?: string
  value?: string | number
  defaultValue?: string | number
  onChange?: (e: React.ChangeEvent<any>) => void
  classname?: string
  onBlur?: (e: React.FocusEvent<any>) => void
  name?: string
  label?: string
  containerClassName?: string
}

export const Input = ({
  type,
  value,
  name,
  defaultValue,
  placeholder,
  onChange,
  onBlur,
  label,
  classname,
  containerClassName,
}: InputProps) => {
  const [field, meta] = useField({ type, value, onChange, onBlur, name })

  return (
    <>
      <div className={containerClassName}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          className={ClassNames(styles.Input, classname)}
          {...field}
          {...meta}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        <InputError {...meta} />
      </div>
    </>
  )
}
