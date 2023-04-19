import ClassNames from 'classnames'
import { FieldMetaProps } from 'formik'

import style from './InputError.styl'

export const InputError = ({ ...meta }: FieldMetaProps<{}>) => {
  const { touched, error } = meta

  if (touched && typeof error === 'string' && error)
    return <div className={ClassNames(style.InputError, 'error')}>{error}</div>
  return null
}
