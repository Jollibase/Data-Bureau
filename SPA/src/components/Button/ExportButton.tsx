import ClassNames from 'classnames'

import { ReactComponent as Export } from '@Images/export.svg'
import { Button } from '.'

import styles from './Button.styl'
interface ExportButtonProps {
  onclick: VoidFunction
  disabled?: boolean
  classname?: string
}

export const ExportButton = ({
  onclick,
  disabled,
  classname,
}: ExportButtonProps) => {
  return (
    <Button
      onclick={onclick}
      classname={ClassNames(styles.ExportButton, classname)}
      logo={<Export />}
      disabled={disabled}
    />
  )
}
