import { FieldMetaProps } from 'formik'

import style from './InputError.styl'

export const InputError = ({ ...meta }: FieldMetaProps<{}>) => {
  const { touched, error } = meta

  if (touched && typeof error === 'string' && error)
    return <div className={style.InputError}>{error}</div>
  return null
}
