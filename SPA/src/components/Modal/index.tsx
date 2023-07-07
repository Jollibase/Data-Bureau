import ClassNames from 'classnames'

import { Portal } from '../Portal'

import style from './Modal.styl'

interface ModalProps {
  shouldShow: boolean
  children: React.ReactNode
  className?: string
  onClose: VoidFunction
}

export const Modal = ({
  shouldShow,
  children,
  className,
  onClose,
}: ModalProps) => {
  if (!shouldShow) {
    return null
  }

  return (
    <Portal>
      <div className={ClassNames(style.Modal, className)} onClick={onClose}>
        <div className="modal-children" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
