import ClassNames from 'classnames'
import { useField } from 'formik'

import { InputError } from '../InputError'

import styles from './Select.styl'

interface SelectProps {
  value?: string | number
  defaultValue?: string | number
  onChange?: (e: React.ChangeEvent<any>) => void
  classname?: string
  onBlur?: (e: React.FocusEvent<any>) => void
  name?: string
  label?: string
  containerClassName?: string
  options: {
    label: string
    value: string
  }[]
}

export const Select = ({
  value,
  name,
  defaultValue,
  onChange,
  onBlur,
  label,
  classname,
  containerClassName,
  options,
}: SelectProps) => {
  const [field, meta] = useField({ value, onChange, onBlur, name })

  return (
    <>
      <div className={containerClassName}>
        {label && <label htmlFor={name}>{label}</label>}
        <select
          className={ClassNames(styles.Select, classname)}
          {...field}
          {...meta}
          defaultValue={defaultValue}>
          {options.map(({ label, value }, index) => (
            <option disabled={index === 0} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <InputError {...meta} />
    </>
  )
}
