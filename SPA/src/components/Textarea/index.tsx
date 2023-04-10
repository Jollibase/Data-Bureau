import ClassNames from 'classnames'
import { useField } from 'formik'

import { InputError } from '../InputError'

import styles from './Textarea.styl'

interface TextareaProps {
  value?: string | number
  onChange?: (e: React.ChangeEvent<any>) => void
  classname?: string
  onBlur?: (e: React.FocusEvent<any>) => void
  name?: string
  label?: string
  containerClassName?: string
  rows?: number
  placeholder?: string
  cols?: number
}

export const Textarea = ({
  value,
  name,
  onChange,
  onBlur,
  label,
  classname,
  containerClassName,
  rows,
  cols,
  placeholder,
}: TextareaProps) => {
  const [field, meta] = useField({ value, onChange, onBlur, name })

  return (
    <>
      <div className={containerClassName}>
        {label && <label htmlFor={name}>{label}</label>}
        <textarea
          className={ClassNames(styles.Textarea, classname)}
          {...field}
          {...meta}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
        />
      </div>
      <InputError {...meta} />
    </>
  )
}
