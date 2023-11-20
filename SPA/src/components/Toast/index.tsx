import { useEffect, useState } from 'react'
import ClassNames from 'classnames'

import { Portal } from '../Portal'

import style from './Toast.styl'

interface ToastProps {
  message: string | undefined
  level: 'alert' | 'success' | 'error'
  onClear?: VoidFunction
}

export const Toast = ({ message, level, onClear }: ToastProps) => {
  const [ownMessage, setOwnMessage] = useState(message)

  useEffect(() => {
    setOwnMessage(message)
  }, [message])

  useEffect(() => {
    const interval = setInterval(deleteToast, 3000)
    return () => clearInterval(interval)
  }, [ownMessage])

  const deleteToast = () => {
    setOwnMessage('')
    onClear?.()
  }

  return (
    <Portal>
      {!!ownMessage && (
        <div className={ClassNames(style.Toast)}>
          <div className={ClassNames('toast', level)}>
            <div className="toast_message">{message}</div>
            <div className="cancel_btn" onClick={deleteToast}>
              X
            </div>
          </div>
        </div>
      )}
    </Portal>
  )
}
